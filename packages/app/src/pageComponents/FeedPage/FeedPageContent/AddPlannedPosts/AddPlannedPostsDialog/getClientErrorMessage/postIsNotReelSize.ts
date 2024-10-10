import { Post } from '../types';

export default (post: Post): boolean => {
  const aspectRatio = post.resolution.width / post.resolution.height;

  return aspectRatio >= 0.56 && aspectRatio <= 0.57;
};
