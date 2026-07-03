import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgres://postgres:postgres@localhost:51214/template1?sslmode=disable&connection_limit=10&connect_timeout=0&max_idle_connection_lifetime=0&pool_timeout=0&socket_timeout=0&pgbouncer=true"
    }
  }
});

async function main() {
  console.log('Starting seed...');

  await prisma.productTag.deleteMany();
  await prisma.product.deleteMany();
  await prisma.content.deleteMany();
  await prisma.storefront.deleteMany();
  await prisma.user.deleteMany({
    where: {
      username: { in: ['the_coffee_co', 'alice_adventures', 'bob_explorer'] }
    }
  });

  // 1. Create a B2B Venue User
  let venue = await prisma.user.findUnique({ where: { username: 'the_coffee_co' } });
  if (!venue) {
    venue = await prisma.user.create({
      data: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'The Coffee Co.',
        username: 'the_coffee_co',
        email: 'hello@coffeeco.com',
        accountType: 'venue',
        profilePhotoUrl: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&q=80',
        city: 'San Francisco',
        bio: 'Best coffee in town.',
        referralCode: 'COFFEECO2026',
      },
    });
  }

  console.log('Created Venue:', venue.username);

  // 2. Create Storefront & Products for the Venue
  let storefront = await prisma.storefront.findUnique({ where: { userId: venue.id } });
  if (!storefront) {
    storefront = await prisma.storefront.create({
      data: {
        userId: venue.id,
        name: 'The Coffee Co. Merch & Menu',
        products: {
          create: [
            {
              name: 'Iced Latte',
              price: 550, // $5.50
              description: 'A refreshing iced latte.',
              imageUrl: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba1?w=400&q=80',
            },
            {
              name: 'Coffee Co. Tote Bag',
              price: 2500, // $25.00
              description: 'Carry your goods in style.',
              imageUrl: 'https://images.unsplash.com/photo-1597484661643-2f5fef640ddd?w=400&q=80',
            },
          ],
        },
      },
    });
  }

  console.log('Created Storefront for:', venue.username);

  const products = await prisma.product.findMany({
    where: { storefrontId: storefront.id },
  });

  // 3. Create regular Users
  let user1 = await prisma.user.findUnique({ where: { username: 'alice_adventures' } });
  if (!user1) {
    user1 = await prisma.user.create({
      data: {
        id: '650e8400-e29b-41d4-a716-446655440001',
        name: 'Alice Smith',
        username: 'alice_adventures',
        email: 'alice@example.com',
        accountType: 'personal',
        profilePhotoUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
        city: 'San Francisco',
        referralCode: 'ALICE2026',
      },
    });
  }

  let user2 = await prisma.user.findUnique({ where: { username: 'bob_explorer' } });
  if (!user2) {
    user2 = await prisma.user.create({
      data: {
        id: '750e8400-e29b-41d4-a716-446655440002',
        name: 'Bob Jones',
        username: 'bob_explorer',
        email: 'bob@example.com',
        accountType: 'personal',
        profilePhotoUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
        city: 'San Francisco',
        referralCode: 'BOB2026',
      },
    });
  }

  console.log('Created Users:', user1.username, user2.username);

  // 4. Create Content with AI Product Tags
  await prisma.content.create({
    data: {
      userId: user1.id,
      type: 'photo',
      sourceFlag: 'in_app_camera',
      mediaUrl: 'https://images.unsplash.com/photo-1495474472207-464a8d54ee28?w=800&q=80',
      textBody: 'Starting my day with the best Iced Latte in SF! ☕️',
      venueId: venue.id,
      productTags: {
        create: [
          {
            productId: products.find(p => p.name === 'Iced Latte')!.id,
          }
        ]
      }
    }
  });

  await prisma.content.create({
    data: {
      userId: user2.id,
      type: 'text',
      sourceFlag: 'in_app_text',
      textBody: 'Just bought this amazing tote bag from The Coffee Co. It fits my laptop perfectly!',
      venueId: venue.id,
      productTags: {
        create: [
          {
            productId: products.find(p => p.name === 'Coffee Co. Tote Bag')!.id,
          }
        ]
      }
    }
  });

  await prisma.content.create({
    data: {
      userId: user1.id,
      type: 'photo',
      sourceFlag: 'in_app_camera',
      mediaUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80',
      textBody: 'Vibes.',
      // No product tags for this one to show a normal post
    }
  });

  await prisma.content.create({
    data: {
      userId: user2.id,
      type: 'video',
      sourceFlag: 'in_app_camera',
      mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      textBody: 'Taking my new tote bag for a ride! 🚲',
      venueId: venue.id,
      productTags: {
        create: [
          {
            productId: products.find(p => p.name === 'Coffee Co. Tote Bag')!.id,
          }
        ]
      }
    }
  });

  console.log('Created Content & Product Tags.');
  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
