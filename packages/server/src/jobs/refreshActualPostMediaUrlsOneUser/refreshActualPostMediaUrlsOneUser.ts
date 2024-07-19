import { RefreshActualPostMediaUrlsOneUserJob } from '@/common/jobs';

import { refreshMediaItemUrls } from '@/server/instagram';

export default async (
  data: RefreshActualPostMediaUrlsOneUserJob['data']
): Promise<void> => {
  const { userId } = data;

  await refreshMediaItemUrls({
    auth: { currentUserId: userId },
    where: { userId },
  });
};
