import { isImageFile } from '@/app/file';

import { Post } from './types';

export default (post: Post): boolean => {
  return !isImageFile(post.file);
};
