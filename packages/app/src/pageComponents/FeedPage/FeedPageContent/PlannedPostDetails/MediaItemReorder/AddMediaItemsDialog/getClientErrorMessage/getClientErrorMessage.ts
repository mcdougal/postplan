import { Post } from '../types';

import postHasError from './postHasError';
import postIsNotImage from './postIsNotImage';

export default (posts: Array<Post>): string | null => {
  if (posts.some(postIsNotImage)) {
    return `Only image files are allowed`;
  }

  if (posts.some(postHasError)) {
    return `Re-upload files with errors`;
  }

  return null;
};
