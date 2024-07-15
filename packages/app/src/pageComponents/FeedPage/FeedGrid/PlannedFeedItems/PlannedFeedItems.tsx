'use client';

import { CurrentUser } from '@/common/users';
import { PlannedPost } from '@/server/plannedPosts';
import { useState } from 'react';
import { createPortal } from 'react-dom';

import PlannedFeedItem from './PlannedFeedItem';
import PlannedPostActions from './PlannedPostActions';
import useDeleteRequest from './useDeleteRequest';
import usePlannedPostsSelector from './usePlannedPostsSelector';
import useReorderRequest from './useReorderRequest';

type Props = {
  currentUser: CurrentUser;
  downloadUrlByMediaItemId: Map<string, string>;
  optimisticPlannedPosts: Array<PlannedPost>;
  phoneContainerRef: React.RefObject<HTMLDivElement>;
  setOptimisticPlannedPosts: (plannedPosts: Array<PlannedPost>) => void;
};

const PlannedFeedItems = ({
  currentUser,
  downloadUrlByMediaItemId,
  optimisticPlannedPosts,
  phoneContainerRef,
  setOptimisticPlannedPosts,
}: Props): React.ReactElement => {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const {
    onClickPlannedPost,
    onDeselectAllPlannedPosts,
    selectedPlannedPosts,
  } = usePlannedPostsSelector();

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
            downloadUrlByMediaItemId={downloadUrlByMediaItemId}
            draggingIndex={draggingIndex}
            dragOverIndex={dragOverIndex}
            isSelected={selectedPlannedPosts.some((selectedPlannedPost) => {
              return selectedPlannedPost.id === plannedPost.id;
            })}
            onClick={(event) => {
              onClickPlannedPost(plannedPost, { multiSelect: event.metaKey });
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
          />
        );
      })}
      {selectedPlannedPosts.length > 0 &&
        phoneContainerRef.current &&
        createPortal(
          <PlannedPostActions
            allPlannedPosts={optimisticPlannedPosts}
            onDelete={(plannedPosts) => {
              onDeselectAllPlannedPosts();
              deletePlannedPosts(plannedPosts);
            }}
            onDeselectAll={onDeselectAllPlannedPosts}
            selectedPlannedPosts={selectedPlannedPosts}
          />,
          phoneContainerRef.current
        )}
    </>
  );
};

export default PlannedFeedItems;
