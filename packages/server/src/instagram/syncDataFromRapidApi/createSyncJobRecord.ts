import { db, firstOrThrow } from '@/db/connection';
import { instagramSyncJob } from '@/db/schema';
import { createId } from '@paralleldrive/cuid2';

export default async (
  userId: string,
  batchId: string,
  cursor: string | undefined
): Promise<string> => {
  const syncJob = firstOrThrow(
    await db
      .insert(instagramSyncJob)
      .values({
        apiSource: `RapidApiInstagramBulkProfileScrapper`,
        batchId,
        cursor,
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
