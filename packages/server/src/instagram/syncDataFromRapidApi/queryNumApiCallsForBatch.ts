import { and, db, eq } from '@/db/connection';
import { instagramSyncHistoryItem } from '@/db/schema';

export default async (userId: string, batchId: string): Promise<number> => {
  const batchHistoryItems = await db.query.instagramSyncHistoryItem.findMany({
    where: and(
      eq(instagramSyncHistoryItem.userId, userId),
      eq(instagramSyncHistoryItem.batchId, batchId)
    ),
    columns: { id: true },
  });

  return batchHistoryItems.length;
};
