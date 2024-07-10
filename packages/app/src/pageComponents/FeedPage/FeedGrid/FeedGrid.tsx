'use client';

import { InstagramMediaItem } from '@/server/instagram';
import { PlannedPost } from '@/server/plannedPosts';
import { useState } from 'react';

import ActualFeedItem from './ActualFeedItem';
import styles from './FeedGrid.module.css';
import { getGridSize, getItemBounds } from './gridPositioning';
import PlannedFeedItem from './PlannedFeedItem';
import reorderPlannedPosts from './reorderPlannedPosts';

type Props = {
  actualPosts: Array<InstagramMediaItem>;
  plannedPosts: Array<PlannedPost>;
};

const FeedGrid = ({ actualPosts, plannedPosts }: Props): React.ReactElement => {
  const [draggedPostId, setDraggedPostId] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const reorderedPlannedPosts =
    draggedPostId !== null && dragOverIndex !== null
      ? reorderPlannedPosts(plannedPosts, draggedPostId, dragOverIndex)
      : plannedPosts;

  const gridSize = getGridSize({
    numItems: actualPosts.length + reorderedPlannedPosts.length,
  });

  return (
    <div className={styles.phone}>
      <div className={styles.phoneScreen}>
        <div
          className="relative"
          style={{ height: gridSize.height, width: gridSize.width }}>
          {reorderedPlannedPosts.map((plannedPost, i) => {
            const bounds = getItemBounds({ index: i });

            return (
              <PlannedFeedItem
                key={plannedPost.id}
                bounds={bounds}
                isDragging={draggedPostId === plannedPost.id}
                onDragEnd={() => {
                  setDraggedPostId(null);
                  setDragOverIndex(null);
                }}
                onDragEnter={() => {
                  setDragOverIndex(i);
                }}
                onDragStart={() => {
                  setDraggedPostId(plannedPost.id);
                }}
                plannedPost={plannedPost}
              />
            );
          })}
          {actualPosts.map((actualPost, i) => {
            const bounds = getItemBounds({
              index: reorderedPlannedPosts.length + i,
            });

            return (
              <ActualFeedItem
                key={actualPost.id}
                actualPost={actualPost}
                bounds={bounds}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeedGrid;
