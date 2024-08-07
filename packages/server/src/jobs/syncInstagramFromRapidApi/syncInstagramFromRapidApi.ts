import { SyncInstagramFromRapidApiJob } from '@/common/jobs';

import { syncDataFromRapidApi } from '@/server/instagram';

export default async (job: SyncInstagramFromRapidApiJob): Promise<void> => {
  const { force, userId } = job.data;

  await syncDataFromRapidApi({
    auth: { currentUserId: userId },
    where: { userId },
    force,
  });
};
