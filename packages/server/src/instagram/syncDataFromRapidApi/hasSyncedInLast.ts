import { and, db, desc, eq, not } from '@/db/connection';
import { instagramSyncJob } from '@/db/schema';

export default async (ms: number, userId: string): Promise<boolean> => {
  const mostRecentJob = await db.query.instagramSyncJob.findFirst({
    where: and(
      eq(instagramSyncJob.userId, userId),
      not(eq(instagramSyncJob.status, `Failed`)),
      eq(instagramSyncJob.apiSource, `RapidApiInstagramBulkProfileScrapper`)
    ),
    orderBy: desc(instagramSyncJob.startedAt),
    columns: { startedAt: true },
  });

  if (!mostRecentJob) {
    return false;
  }

  const msSinceLastSync = Date.now() - mostRecentJob.startedAt.getTime();

  return msSinceLastSync < ms;
};
