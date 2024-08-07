import { db, eq } from '@/db/connection';
import { instagramSyncJob } from '@/db/schema';

export default async (
  syncJobId: string,
  { error }: { error: boolean }
): Promise<void> => {
  await db
    .update(instagramSyncJob)
    .set({
      endedAt: new Date(),
      status: error ? `Failed` : `Succeeded`,
    })
    .where(eq(instagramSyncJob.id, syncJobId));
};
