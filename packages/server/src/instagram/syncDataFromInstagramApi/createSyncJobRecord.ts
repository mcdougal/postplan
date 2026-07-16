import { db, firstOrThrow } from '@/db/connection';
import { instagramSyncJob } from '@/db/schema';
import { createId } from '@paralleldrive/cuid2';

export default async (userId: string, batchId: string): Promise<string> => {
  const syncJob = firstOrThrow(
    await db
      .insert(instagramSyncJob)
      .values({
        apiSource: `InstagramBasicApi`,
        batchId,
        id: createId(),
        startedAt: new Date(),
        status: `InProgress`,
        userId,
      })
      .returning({
        id: instagramSyncJob.id,
      })
  );

  return syncJob.id;
};
