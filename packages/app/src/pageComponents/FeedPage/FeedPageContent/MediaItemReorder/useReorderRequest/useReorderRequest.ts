import { CurrentUser } from '@/common/users';
import { PlannedPost } from '@/server/plannedPosts';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-hot-toast';

import reorderMediaItemsServerAction from './reorderMediaItemsServerAction';
import sortMediaItems from './sortMediaItems';

type MediaItem = PlannedPost['mediaItems'][number];

type Request = {
  reorderMediaItems: () => Promise<void>;
};

export default (
  currentUser: CurrentUser,
  plannedPostId: string,
  mediaItems: Array<MediaItem>,
  setOptimisticPlannedPosts: Dispatch<SetStateAction<Array<PlannedPost>>>,
  draggingIndex: number | null,
  dragOverIndex: number | null
): Request => {
  const reorderMediaItems = async (): Promise<void> => {
    const reorderedMediaItems = sortMediaItems(
      mediaItems,
      draggingIndex,
      dragOverIndex
    );

    setOptimisticPlannedPosts((prevPlannedPosts) => {
      return prevPlannedPosts.map((plannedPost) => {
        if (plannedPost.id === plannedPostId) {
          return {
            ...plannedPost,
            mediaItems: reorderedMediaItems.map((mediaItem, i) => {
              return {
                ...mediaItem,
                order: i,
              };
            }),
          };
        }

        return plannedPost;
      });
    });

    const response = await reorderMediaItemsServerAction({
      auth: { currentUserId: currentUser.id },
      data: { mediaItems: reorderedMediaItems },
    });

    if (response.status === `error`) {
      toast.error(response.message);
    }
  };

  return {
    reorderMediaItems,
  };
};
