import { CurrentUser } from '@/common/users';
import { PlannedPost } from '@/server/plannedPosts';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    setOptimisticPlannedPosts(plannedPosts);
  }, [plannedPosts]);

  const reorderPlannedPosts = async (): Promise<void> => {
    const reorderedPosts = sortPlannedPosts(
      plannedPosts,
      draggingIndex,
      dragOverIndex
    );

    setOptimisticPlannedPosts(reorderedPosts);

    const response = await reorderPlannedPostsServerAction({
      auth: { currentUserId: currentUser.id },
      data: { plannedPosts: reorderedPosts },
    });

    if (response.status === `error`) {
      setOptimisticPlannedPosts(plannedPosts);
      toast.error(`Error reordering posts`);
    }
  };

  return {
    optimisticPlannedPosts,
    reorderPlannedPosts,
  };
};
