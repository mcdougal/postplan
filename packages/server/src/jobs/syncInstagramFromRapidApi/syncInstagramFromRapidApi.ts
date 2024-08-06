import { SyncInstagramFromRapidApiJob } from '@/common/jobs';

import { syncDataFromRapidApi } from '@/server/instagram';

export default async (job: SyncInstagramFromRapidApiJob): Promise<void> => {
  // const { userId } = job.data;
  const userId = `tuuot0spt7fqg3f45vh0y4q6`;

  await syncDataFromRapidApi({
    auth: { currentUserId: userId },
    where: { userId },
  });

  // todo - sync all users
};
