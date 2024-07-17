'use client';

import { CurrentUser } from '@/common/users';
import { PlannedPost } from '@/server/plannedPosts';
import { Dispatch, SetStateAction, useState } from 'react';

import { SelectedPostId } from '../../usePostSelector';

import PlannedFeedItem from './PlannedFeedItem';
import useReorderRequest from './useReorderRequest';

type Props = {
  currentUser: CurrentUser;
  onSelectPost: (selectedPostId: SelectedPostId) => void;
  optimisticPlannedPosts: Array<PlannedPost>;
  setOptimisticPlannedPosts: Dispatch<SetStateAction<Array<PlannedPost>>>;
  thumbnailUrlByMediaItemId: Map<string, string>;
};

const PlannedFeedItems = ({
  currentUser,
  onSelectPost,
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

  return (
    <>
      {optimisticPlannedPosts.map((plannedPost, i) => {
        return (
          <PlannedFeedItem
            key={plannedPost.id}
            draggingIndex={draggingIndex}
            dragOverIndex={dragOverIndex}
            onClick={() => {
              onSelectPost({ type: `planned`, plannedPostId: plannedPost.id });
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
