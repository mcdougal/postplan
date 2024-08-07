import { SyncInstagramFromRapidApiJob } from '@/common/jobs';
import { v4 as uuidv4 } from 'uuid';

import { syncDataFromRapidApi } from '@/server/instagram';

export default async (job: SyncInstagramFromRapidApiJob): Promise<void> => {
  const {
    batchId: providedBatchId,
    cursor,
    force,
    maxApiCalls,
    userId,
  } = job.data;

  const batchId = providedBatchId || uuidv4();

  await syncDataFromRapidApi({
    auth: { currentUserId: userId },
    data: { batchId },
    where: { cursor, userId },
    options: { force, maxApiCalls },
  });
};
