import { DrizzleTransaction } from '@/db/connection';
import { instagramSyncHistoryItem } from '@/db/schema';
import { createId } from '@paralleldrive/cuid2';

export default async (
  tx: DrizzleTransaction,
  userId: string
): Promise<void> => {
  await tx.insert(instagramSyncHistoryItem).values({
    id: createId(),
    syncSource: `RapidApiInstagramBulkProfileScrapper`,
    syncStartedAt: new Date(),
    userId,
  });
};
