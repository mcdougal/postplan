import { RefreshPlannedPostMediaUrlsOneUserJob } from '@/common/jobs';

import { refreshMediaItemUrls } from '@/server/plannedPosts';

export default async (
  data: RefreshPlannedPostMediaUrlsOneUserJob['data']
): Promise<void> => {
  const { userId } = data;

  await refreshMediaItemUrls({
    auth: { currentUserId: userId },
    where: { userId },
  });
};
