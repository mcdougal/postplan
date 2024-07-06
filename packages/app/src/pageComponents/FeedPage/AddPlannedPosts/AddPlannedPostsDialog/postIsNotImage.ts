import { Post } from './types';

export default (post: Post): boolean => {
  return post.file.type.split(`/`)[0] !== `image`;
};
