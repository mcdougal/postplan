import { PlannedPost } from '@/server/plannedPosts';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { toast } from 'react-hot-toast';

import updateCaptionServerAction from './updateCaptionServerAction';

type Request = {
  updateCaption: (plannedPostId: string, caption: string) => Promise<void>;
};

export default (
  setOptimisticPlannedPosts: Dispatch<SetStateAction<Array<PlannedPost>>>
): Request => {
  const updateCaption = useCallback(
    async (plannedPostId: string, caption: string): Promise<void> => {
      setOptimisticPlannedPosts((prevPlannedPosts) => {
        return prevPlannedPosts.map((plannedPost) => {
          if (plannedPost.id === plannedPostId) {
            return {
              ...plannedPost,
              caption,
            };
          }

          return plannedPost;
        });
      });

      const response = await updateCaptionServerAction({
        where: { id: plannedPostId },
        data: { caption },
      });

      if (response.status === `error`) {
        toast.error(response.message);
      }
    },
    [setOptimisticPlannedPosts]
  );

  return {
    updateCaption,
  };
};
