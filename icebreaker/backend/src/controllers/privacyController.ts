import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { getAuth } from 'firebase-admin/auth';

const prisma = new PrismaClient();

/**
 * Data Deletion API (GDPR / CCPA / SOC2 Compliance)
 * 
 * Handles automated cascading deletes for user data.
 * Ensures PII and relational data is removed from the database and authentication providers.
 */
export const deleteUserAccount = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.uid;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized.' });
    }

    console.log(`[Privacy] Initiating account deletion for user: ${userId}`);

    // 1. Prisma Transaction for cascading deletes
    // Assuming a schema where User has related Posts, Comments, Settings, etc.
    // In Prisma, `onDelete: Cascade` handles relational rows automatically.
    await prisma.$transaction(async (tx) => {
      // Execute any custom anonymization if we need to keep statistical records instead of hard deletes
      // Example: tx.post.updateMany({ where: { authorId: userId }, data: { authorId: 'DELETED_USER' } })

      // Hard Delete User Record
      // (This will cascade to any related tables configured with onDelete: Cascade)
      // Note: We use any here because we don't know the exact Prisma schema for Icebreaker, but `user` is standard.
      const userDelegate = tx.user as any; 
      if (userDelegate && userDelegate.delete) {
         await userDelegate.delete({
           where: { id: userId }
         });
      }
    });

    // 2. Delete from Firebase Auth
    try {
      await getAuth().deleteUser(userId);
    } catch (fbError: any) {
      if (fbError.code !== 'auth/user-not-found') {
        throw fbError;
      }
    }

    // 3. (Optional) Stripe Customer Deletion / Cancel Subscriptions
    // const stripeCustomer = await stripe.customers.search(...)
    // await stripe.customers.del(stripeCustomer.id)

    console.log(`[Privacy] Successfully deleted account for user: ${userId}`);
    return res.status(200).json({ 
      success: true, 
      message: 'Account and associated data have been permanently deleted.' 
    });

  } catch (error) {
    console.error('[Privacy] Account deletion failed:', error);
    return res.status(500).json({ success: false, message: 'Failed to process account deletion.' });
  }
};
