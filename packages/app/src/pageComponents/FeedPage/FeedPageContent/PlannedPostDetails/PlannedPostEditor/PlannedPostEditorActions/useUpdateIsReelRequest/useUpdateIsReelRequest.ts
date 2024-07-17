import { CurrentUser } from '@/common/users';
import { PlannedPost } from '@/server/plannedPosts';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { toast } from 'react-hot-toast';

import updateIsReelServerAction from './updateIsReelServerAction';

type Request = {
  updateIsReel: (plannedPostId: string, isReel: boolean) => Promise<void>;
};

export default (
  currentUser: CurrentUser,
  setOptimisticPlannedPosts: Dispatch<SetStateAction<Array<PlannedPost>>>
): Request => {
  const updateIsReel = useCallback(
    async (plannedPostId: string, isReel: boolean): Promise<void> => {
      setOptimisticPlannedPosts((prevPlannedPosts) => {
        return prevPlannedPosts.map((plannedPost) => {
          if (plannedPost.id === plannedPostId) {
            return {
              ...plannedPost,
              isReel,
            };
          }

          return plannedPost;
        });
      });

      const response = await updateIsReelServerAction({
        auth: { currentUserId: currentUser.id },
        where: { id: plannedPostId },
        data: { isReel },
      });

      if (response.status === `error`) {
        toast.error(response.message);
      }
    },
    [currentUser, setOptimisticPlannedPosts]
  );

  return {
    updateIsReel,
  };
};
