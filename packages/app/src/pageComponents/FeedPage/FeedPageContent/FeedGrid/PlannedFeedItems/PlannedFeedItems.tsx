'use client';

import { CurrentUser } from '@/common/users';
import { PlannedPost } from '@/server/plannedPosts';
import { useState } from 'react';

import PlannedFeedItem from './PlannedFeedItem';
import useDeleteRequest from './useDeleteRequest';
import useReorderRequest from './useReorderRequest';

type Props = {
  currentUser: CurrentUser;
  onSelectPlannedPost: (plannedPost: PlannedPost) => void;
  optimisticPlannedPosts: Array<PlannedPost>;
  setOptimisticPlannedPosts: (plannedPosts: Array<PlannedPost>) => void;
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

  const { deletePlannedPosts } = useDeleteRequest(
    currentUser,
    optimisticPlannedPosts,
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
