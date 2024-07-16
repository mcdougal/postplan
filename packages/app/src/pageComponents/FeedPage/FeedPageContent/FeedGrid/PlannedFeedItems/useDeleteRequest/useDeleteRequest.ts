import { CurrentUser } from '@/common/users';
import { PlannedPost } from '@/server/plannedPosts';
import { toast } from 'react-hot-toast';

import deletePlannedPostsServerAction from './deletePlannedPostsServerAction';

type Request = {
  deletePlannedPosts: (
    plannedPostsToDelete: Array<PlannedPost>
  ) => Promise<void>;
};

export default (
  currentUser: CurrentUser,
  optimisticPlannedPosts: Array<PlannedPost>,
  setOptimisticPlannedPosts: (plannedPosts: Array<PlannedPost>) => void
): Request => {
  const deletePlannedPosts = async (
    plannedPosts: Array<PlannedPost>
  ): Promise<void> => {
    const idsToDelete = new Set(
      plannedPosts.map(({ id }) => {
        return id;
      })
    );

    setOptimisticPlannedPosts(
      optimisticPlannedPosts.filter((plannedPost) => {
        return !idsToDelete.has(plannedPost.id);
      })
    );

    const response = await deletePlannedPostsServerAction({
      auth: { currentUserId: currentUser.id },
      data: { plannedPostIds: Array.from(idsToDelete) },
    });

    if (response.status === `error`) {
      toast.error(`Error deleting posts`);
    }
  };

  return {
    deletePlannedPosts,
  };
};
