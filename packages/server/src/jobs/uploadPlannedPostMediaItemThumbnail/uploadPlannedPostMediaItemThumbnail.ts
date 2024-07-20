import { UploadPlannedPostMediaItemThumbnailJob } from '@/common/jobs';

import { uploadPlannedPostMediaItemThumbnail } from '@/server/plannedPosts';

export default async (
  data: UploadPlannedPostMediaItemThumbnailJob['data']
): Promise<void> => {
  const { plannedPostMediaItemId } = data;
  await uploadPlannedPostMediaItemThumbnail(plannedPostMediaItemId);
};
