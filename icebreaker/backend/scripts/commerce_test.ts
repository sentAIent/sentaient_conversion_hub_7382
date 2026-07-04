import { resolvers } from '../src/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function runTests() {
  console.log("Starting Commerce End-to-End Validation...");

  // Mock Contexts
  const businessContext = { user: { uid: "business_user_123" } };
  const mobileUserContext = { user: { uid: "mobile_user_456" } };

  try {
    // 1. Setup Mock Users
    await prisma.user.upsert({
      where: { id: "business_user_123" },
      update: {},
      create: { id: "business_user_123", username: "business1", email: "biz@example.com", name: "Biz Name", referralCode: "BIZ123" }
    });
    
    await prisma.user.upsert({
      where: { id: "mobile_user_456" },
      update: {},
      create: { id: "mobile_user_456", username: "mobile1", email: "mob@example.com", name: "Mobile User", referralCode: "MOB456" }
    });

    console.log("Mock users created.");

    // 2. Business Creates a Bounty
    const bounty = await resolvers.Mutation.createBounty(null, {
      title: "Test E2E Bounty",
      description: "A test bounty",
      reward: 500, // 500 cents
      totalBudget: 5000,
      latitude: 37.7749,
      longitude: -122.4194
    }, businessContext);

    console.log("Bounty Created: ", bounty.id);

    // 3. Mobile User Creates some mock content
    const content = await prisma.content.create({
      data: {
        userId: "mobile_user_456",
        type: "photo",
        mediaUrl: "http://example.com/mock.jpg",
        textBody: "Here is my bounty submission!",
        sourceFlag: "in_app_camera"
      }
    });

    console.log("Mock Content Created: ", content.id);

    // 4. Mobile User Claims the Bounty
    const claimResult = await resolvers.Mutation.claimBounty(null, {
      bountyId: bounty.id,
      contentId: content.id
    }, mobileUserContext);

    console.log("Claim Result: ", claimResult);

    // 5. Verify Wallet Update
    const mobileUserWallet = await prisma.wallet.findUnique({
      where: { userId: "mobile_user_456" }
    });

    console.log("Mobile User Wallet Balance: ", mobileUserWallet?.balance);
    if (mobileUserWallet?.balance === 500) {
      console.log("✅ Bounty E2E Validation PASSED");
    } else {
      console.log("❌ Bounty E2E Validation FAILED");
    }

    // 6. Business Creates a Storefront
    const storefront = await resolvers.Mutation.createStorefront(null, {
      name: "Biz E2E Storefront",
      description: "My E2E Storefront"
    }, businessContext);

    console.log("Storefront Created: ", storefront.id);

    // 7. Storefront Items (Not implemented on backend yet)
    console.log("✅ Storefront E2E Validation PASSED (creation only)");

  } catch (error) {
    console.error("Test failed: ", error);
  } finally {
    await prisma.$disconnect();
  }
}

runTests();
