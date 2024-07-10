'use client';

import { InstagramMediaItem } from '@/server/instagram';
import { PlannedPost } from '@/server/plannedPosts';

import ActualFeedItem from './ActualFeedItem';
import styles from './FeedGrid.module.css';
import { getGridSize, getItemBounds } from './gridPositioning';
import PlannedFeedItem from './PlannedFeedItem';
import useDragToReorder from './useDragToReorder';

type Props = {
  actualPosts: Array<InstagramMediaItem>;
  plannedPosts: Array<PlannedPost>;
};

const FeedGrid = ({ actualPosts, plannedPosts }: Props): React.ReactElement => {
  const dragToReorder = useDragToReorder();

  const gridSize = getGridSize({
    numItems: actualPosts.length + plannedPosts.length,
  });

  return (
    <div className={styles.phone}>
      <div className={styles.phoneScreen}>
        <div
          className="relative"
          style={{ height: gridSize.height, width: gridSize.width }}>
          {plannedPosts.map((plannedPost, i) => {
            const reorderedIndex = dragToReorder.calculateReorderedIndex(i);
            const bounds = getItemBounds({ index: reorderedIndex });

            return (
              <PlannedFeedItem
                key={plannedPost.id}
                bounds={bounds}
                isAnimating={dragToReorder.isMoveAnimationActive()}
                isDragging={dragToReorder.isDragging(i)}
                onDragEnd={dragToReorder.onDragEnd}
                onDragEnter={dragToReorder.onDragEnter(reorderedIndex)}
                onDragStart={dragToReorder.onDragStart(i)}
                plannedPost={plannedPost}
              />
            );
          })}
          {actualPosts.map((actualPost, i) => {
            const bounds = getItemBounds({ index: plannedPosts.length + i });

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
