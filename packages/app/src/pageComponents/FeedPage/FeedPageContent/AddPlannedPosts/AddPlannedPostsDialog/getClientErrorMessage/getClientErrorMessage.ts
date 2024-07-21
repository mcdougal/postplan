import { Post } from '../types';

import postHasError from './postHasError';
import postIsNotImage from './postIsNotImage';
import postIsNotReelSize from './postIsNotReelSize';

export default (posts: Array<Post>, isReel: boolean): string | null => {
  if (posts.some(postIsNotImage)) {
    return `Only image files are allowed`;
  }

  if (isReel && posts.some(postIsNotReelSize)) {
    return `Reel covers must be 9:16`;
  }

  if (posts.some(postHasError)) {
    return `Re-upload files with errors`;
  }

  return null;
};
