import { db, desc, eq } from '@/db/connection';
import { instagramSyncHistoryItem } from '@/db/schema';

export default async (ms: number, userId: string): Promise<boolean> => {
  const mostRecentHistoryItem =
    await db.query.instagramSyncHistoryItem.findFirst({
      where: eq(instagramSyncHistoryItem.userId, userId),
      orderBy: desc(instagramSyncHistoryItem.syncStartedAt),
    });

  if (!mostRecentHistoryItem) {
    return false;
  }

  const msSinceLastSync =
    Date.now() - mostRecentHistoryItem.syncStartedAt.getTime();

  return msSinceLastSync < ms;
};
