'use client';

import { CurrentUser } from '@/common/users';
import { PlannedPost } from '@/server/plannedPosts';
import { Dispatch, SetStateAction, useState } from 'react';

import PlannedFeedItem from './PlannedFeedItem';
import useDeleteRequest from './useDeleteRequest';
import useReorderRequest from './useReorderRequest';

type Props = {
  currentUser: CurrentUser;
  onSelectPlannedPost: (plannedPost: PlannedPost) => void;
  optimisticPlannedPosts: Array<PlannedPost>;
  setOptimisticPlannedPosts: Dispatch<SetStateAction<Array<PlannedPost>>>;
  thumbnailUrlByMediaItemId: Map<string, string>;
};

const PlannedFeedItems = ({
  currentUser,
  onSelectPlannedPost,
  optimisticPlannedPosts,
  setOptimisticPlannedPosts,
  thumbnailUrlByMediaItemId,
}: Props): React.ReactElement => {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const { reorderPlannedPosts } = useReorderRequest(
    currentUser,
    optimisticPlannedPosts,
    setOptimisticPlannedPosts,
    draggingIndex,
    dragOverIndex
  );

  const { deletePlannedPost } = useDeleteRequest(
    currentUser,
    setOptimisticPlannedPosts
  );

  return (
    <>
      {optimisticPlannedPosts.map((plannedPost, i) => {
        return (
          <PlannedFeedItem
            key={plannedPost.id}
            draggingIndex={draggingIndex}
            dragOverIndex={dragOverIndex}
            onClick={() => {
              onSelectPlannedPost(plannedPost);
            }}
            onDragEnd={() => {
              setDraggingIndex(null);
              setDragOverIndex(null);
            }}
            onDragEnter={() => {
              setDragOverIndex(i);
            }}
            onDragStart={() => {
              setDraggingIndex(i);
            }}
            onDrop={() => {
              reorderPlannedPosts();
            }}
            plannedPost={plannedPost}
            plannedPostIndex={i}
            thumbnailUrlByMediaItemId={thumbnailUrlByMediaItemId}
          />
        );
      })}
    </>
  );
};

export default PlannedFeedItems;
