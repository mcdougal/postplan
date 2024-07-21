import { v4 as uuidv4 } from 'uuid';

import { getImageFileResolution, isImageFile } from '@/app/file';

import { Post } from '../types';

export default async (file: File): Promise<Post> => {
  const postId = uuidv4();
  const fileExtension = file.name.split(`.`).pop();
  const newFileName = fileExtension ? `${postId}.${fileExtension}` : postId;
  const renamedFile = new File([file], newFileName, { type: file.type });
  const resolution = isImageFile(file)
    ? await getImageFileResolution(file)
    : { height: 0, width: 0 };

  return {
    file: renamedFile,
    id: postId,
    resolution,
    uploadingStatus: `loading`,
  };
};
