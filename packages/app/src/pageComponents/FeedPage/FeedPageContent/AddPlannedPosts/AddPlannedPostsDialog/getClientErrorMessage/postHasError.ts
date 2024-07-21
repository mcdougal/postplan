import { Post } from '../types';

export default (post: Post): boolean => {
  return post.uploadingStatus === `error`;
};
