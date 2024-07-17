import { CurrentUser } from '@/common/users';
import { PlannedPost } from '@/server/plannedPosts';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-hot-toast';

import deleteMediaItemServerAction from './deleteMediaItemServerAction';

type Request = {
  deleteMediaItem: (id: string) => Promise<void>;
};

export default (
  currentUser: CurrentUser,
  plannedPostId: string,
  setOptimisticPlannedPosts: Dispatch<SetStateAction<Array<PlannedPost>>>
): Request => {
  const deleteMediaItem = async (id: string): Promise<void> => {
    setOptimisticPlannedPosts((prevPlannedPosts) => {
      return prevPlannedPosts.map((plannedPost) => {
        if (plannedPost.id === plannedPostId) {
          return {
            ...plannedPost,
            mediaItems: plannedPost.mediaItems.filter((mediaItem) => {
              return mediaItem.id !== id;
            }),
          };
        }

        return plannedPost;
      });
    });

    const response = await deleteMediaItemServerAction({
      auth: { currentUserId: currentUser.id },
      data: { id },
    });

    if (response.status === `error`) {
      toast.error(response.message);
    }
  };

  return {
    deleteMediaItem,
  };
};
