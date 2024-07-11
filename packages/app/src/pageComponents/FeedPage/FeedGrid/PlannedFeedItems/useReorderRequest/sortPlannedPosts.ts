import { PlannedPost } from '@/server/plannedPosts';

import calculateReorderedIndex from '../calculateReorderedIndex';

export default (
  plannedPosts: Array<PlannedPost>,
  draggingIndex: number | null,
  dragOverIndex: number | null
): Array<PlannedPost> => {
  return [...plannedPosts].sort((a, b) => {
    const reorderedIndexA = calculateReorderedIndex(
      plannedPosts.indexOf(a),
      draggingIndex,
      dragOverIndex
    );
    const reorderedIndexB = calculateReorderedIndex(
      plannedPosts.indexOf(b),
      draggingIndex,
      dragOverIndex
    );

    return reorderedIndexA - reorderedIndexB;
  });
};
