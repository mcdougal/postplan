import { and, db, eq } from '@/db/connection';
import { instagramSyncJob } from '@/db/schema';

export default async (userId: string, batchId: string): Promise<number> => {
  const jobsInBatch = await db.query.instagramSyncJob.findMany({
    where: and(
      eq(instagramSyncJob.userId, userId),
      eq(instagramSyncJob.batchId, batchId),
      eq(instagramSyncJob.status, `Succeeded`)
    ),
    columns: { id: true },
  });

  return jobsInBatch.length;
};
