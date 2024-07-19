import { ActualPost } from '@/server/instagram';
import { PlannedPost } from '@/server/plannedPosts';

import { SelectedPost, SelectedPostId } from './types';

export default (
  selectedPostId: SelectedPostId | null,
  optimisticPlannedPosts: Array<PlannedPost>,
  actualPosts: Array<ActualPost>
): SelectedPost | null => {
  if (!selectedPostId) {
    return null;
  }

  if (selectedPostId.type === `actual`) {
    const actualPost = actualPosts.find((post) => {
      return post.instagramId === selectedPostId.actualPostId;
    });

    return actualPost ? { type: `actual`, actualPost } : null;
  }

  if (selectedPostId.type === `planned`) {
    const plannedPost = optimisticPlannedPosts.find((post) => {
      return post.id === selectedPostId.plannedPostId;
    });

    return plannedPost ? { type: `planned`, plannedPost } : null;
  }

  const exhaustiveCheck: never = selectedPostId;
  return exhaustiveCheck;
};
