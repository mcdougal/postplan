import { getThumbnailFileName } from '@/common/userFiles';
import { CurrentUser } from '@/common/users';

import { resizeImageFile } from '@/app/file';
import { uploadUserFile } from '@/app/userFiles';

export default async (
  plannedPostImageFile: File,
  currentUser: CurrentUser
): Promise<void> => {
  const thumbnailFile = await resizeImageFile(plannedPostImageFile, {
    fileName: getThumbnailFileName(plannedPostImageFile.name),
    maxSize: 250,
  });

  await uploadUserFile({ file: plannedPostImageFile, userId: currentUser.id });
  await uploadUserFile({ file: thumbnailFile, userId: currentUser.id });
};
