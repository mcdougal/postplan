import { DrizzleTransaction } from '@/db/connection';
import { instagramSyncHistoryItem } from '@/db/schema';
import { createId } from '@paralleldrive/cuid2';

export default async (
  tx: DrizzleTransaction,
  userId: string,
  batchId: string,
  cursor: string | undefined
): Promise<void> => {
  await tx.insert(instagramSyncHistoryItem).values({
    id: createId(),
    batchId,
    cursor,
    syncSource: `RapidApiInstagramBulkProfileScrapper`,
    syncStartedAt: new Date(),
    userId,
  });
};
