import { InstagramMediaItem } from '@/server/instagram';
import { PlannedPost } from '@/server/plannedPosts';

const NUM_COLUMNS = 3;

export default (
  allActualPosts: Array<InstagramMediaItem>,
  optimisticPlannedPosts: Array<PlannedPost>
): Array<InstagramMediaItem> => {
  const numPosts = optimisticPlannedPosts.length + allActualPosts.length;

  if (numPosts % NUM_COLUMNS === 0) {
    return allActualPosts;
  }

  return allActualPosts.slice(0, -(numPosts % NUM_COLUMNS));
};
