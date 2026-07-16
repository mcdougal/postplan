import { SyncInstagramJob } from '@/common/jobs';
import { v4 as uuidv4 } from 'uuid';

import { syncDataFromInstagramApi } from '@/server/instagram';

export default async (job: SyncInstagramJob): Promise<void> => {
  const { batchId: providedBatchId, force, userId } = job.data;
  const batchId = providedBatchId || uuidv4();

  await syncDataFromInstagramApi({
    auth: { currentUserId: userId },
    data: { batchId },
    options: { force },
    where: { userId },
  });
};
