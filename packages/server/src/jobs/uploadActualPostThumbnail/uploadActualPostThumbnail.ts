import { UploadActualPostThumbnailJob } from '@/common/jobs';

import { uploadActualPostThumbnail } from '@/server/actualPosts';

export default async (
  data: UploadActualPostThumbnailJob['data']
): Promise<void> => {
  const { actualPostId } = data;
  await uploadActualPostThumbnail(actualPostId);
};
