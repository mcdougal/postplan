import { CurrentUser } from '@/common/users';
import { PlannedPost } from '@/server/plannedPosts';
import { toast } from 'react-hot-toast';

import reorderPlannedPostsServerAction from './reorderPlannedPostsServerAction';
import sortPlannedPosts from './sortPlannedPosts';

type Request = {
  reorderPlannedPosts: () => Promise<void>;
};

export default (
  currentUser: CurrentUser,
  optimisticPlannedPosts: Array<PlannedPost>,
  setOptimisticPlannedPosts: (plannedPosts: Array<PlannedPost>) => void,
  draggingIndex: number | null,
  dragOverIndex: number | null
): Request => {
  const reorderPlannedPosts = async (): Promise<void> => {
    const reorderedPosts = sortPlannedPosts(
      optimisticPlannedPosts,
      draggingIndex,
      dragOverIndex
    );

    setOptimisticPlannedPosts(reorderedPosts);

    const response = await reorderPlannedPostsServerAction({
      auth: { currentUserId: currentUser.id },
      data: { plannedPosts: reorderedPosts },
    });

    if (response.status === `error`) {
      toast.error(`Error reordering posts`);
    }
  };

  return {
    reorderPlannedPosts,
  };
};
