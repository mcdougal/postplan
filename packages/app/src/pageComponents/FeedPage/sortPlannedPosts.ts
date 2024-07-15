import { PlannedPost } from '@/server/plannedPosts';

export default (plannedPosts: Array<PlannedPost>): Array<PlannedPost> => {
  return [...plannedPosts].sort((a, b) => {
    if (a.order === null && b.order !== null) {
      return -1;
    }

    if (a.order !== null && b.order === null) {
      return 1;
    }

    if (a.order !== null && b.order !== null) {
      return a.order - b.order;
    }

    return b.createdAt.getTime() - a.createdAt.getTime();
  });
};
