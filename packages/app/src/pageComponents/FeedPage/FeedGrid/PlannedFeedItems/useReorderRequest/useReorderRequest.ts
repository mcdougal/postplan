import { CurrentUser } from '@/common/users';
import { PlannedPost } from '@/server/plannedPosts';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

import reorderPlannedPostsServerAction from './reorderPlannedPostsServerAction';
import sortPlannedPosts from './sortPlannedPosts';

type Request = {
  optimisticPlannedPosts: Array<PlannedPost>;
  reorderPlannedPosts: () => Promise<void>;
};

export default (
  currentUser: CurrentUser,
  plannedPosts: Array<PlannedPost>,
  draggingIndex: number | null,
  dragOverIndex: number | null
): Request => {
  const [optimisticPlannedPosts, setOptimisticPlannedPosts] =
    useState(plannedPosts);

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
    optimisticPlannedPosts,
    reorderPlannedPosts,
  };
};
