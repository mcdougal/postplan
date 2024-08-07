import { SyncInstagramFromRapidApiJob } from '@/common/jobs';
import { v4 as uuidv4 } from 'uuid';

import { queryActualPosts, syncDataFromRapidApi } from '@/server/instagram';

export default async (job: SyncInstagramFromRapidApiJob): Promise<void> => {
  const {
    batchId: providedBatchId,
    cursor,
    force,
    maxApiCalls: providedMaxApiCalls,
    userId,
  } = job.data;

  const batchId = providedBatchId || uuidv4();

  let maxApiCalls: number;

  if (providedMaxApiCalls) {
    maxApiCalls = providedMaxApiCalls;
  } else {
    const actualPosts = await queryActualPosts({
      auth: { currentUserId: userId },
      where: { userId },
      limit: 1,
    });
    maxApiCalls = actualPosts.length === 0 ? 5 : 1;
  }

  await syncDataFromRapidApi({
    auth: { currentUserId: userId },
    data: { batchId },
    where: { cursor, userId },
    options: { force, maxApiCalls },
  });
};
