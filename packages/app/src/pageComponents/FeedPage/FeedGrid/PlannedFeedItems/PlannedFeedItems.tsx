'use client';

import { CurrentUser } from '@/common/users';
import { PlannedPost } from '@/server/plannedPosts';
import { useState } from 'react';

import PlannedFeedItem from './PlannedFeedItem';
import useReorderRequest from './useReorderRequest';

type Props = {
  currentUser: CurrentUser;
  downloadUrlByMediaItemId: Map<string, string>;
  plannedPosts: Array<PlannedPost>;
};

const PlannedFeedItems = ({
  currentUser,
  downloadUrlByMediaItemId,
  plannedPosts,
}: Props): React.ReactElement => {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const { optimisticPlannedPosts, reorderPlannedPosts } = useReorderRequest(
    currentUser,
    plannedPosts,
    draggingIndex,
    dragOverIndex
  );

  return (
    <>
      {optimisticPlannedPosts.map((plannedPost, i) => {
        return (
          <PlannedFeedItem
            key={plannedPost.id}
            downloadUrlByMediaItemId={downloadUrlByMediaItemId}
            draggingIndex={draggingIndex}
            dragOverIndex={dragOverIndex}
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
          />
        );
      })}
    </>
  );
};

export default PlannedFeedItems;
