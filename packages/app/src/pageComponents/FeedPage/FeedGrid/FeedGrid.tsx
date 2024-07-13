'use client';

import { CurrentUser } from '@/common/users';
import { InstagramMediaItem } from '@/server/instagram';
import { PlannedPost } from '@/server/plannedPosts';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import ActualFeedItems from './ActualFeedItems';
import styles from './FeedGrid.module.css';
import { getGridSize } from './gridPositioning';
import PlannedFeedItems from './PlannedFeedItems';
import PlannedPostActions from './PlannedPostActions';

type Props = {
  actualPosts: Array<InstagramMediaItem>;
  currentUser: CurrentUser;
  downloadUrlByMediaItemId: Map<string, string>;
  plannedPosts: Array<PlannedPost>;
};

const FeedGrid = ({
  actualPosts,
  currentUser,
  downloadUrlByMediaItemId,
  plannedPosts,
}: Props): React.ReactElement => {
  const gridSize = getGridSize({
    numItems: actualPosts.length + plannedPosts.length,
  });
  const [selectedPlannedPosts, setSelectedPlannedPosts] = useState<
    Array<PlannedPost>
  >([]);

  const handleClickPlannedPost = (plannedPost: PlannedPost): void => {
    const alreadySelected = selectedPlannedPosts.some((selectedPlannedPost) => {
      return selectedPlannedPost.id === plannedPost.id;
    });

    if (alreadySelected) {
      setSelectedPlannedPosts(
        selectedPlannedPosts.filter((selectedPlannedPost) => {
          return selectedPlannedPost.id !== plannedPost.id;
        })
      );
    } else {
      setSelectedPlannedPosts([...selectedPlannedPosts, plannedPost]);
    }
  };

  return (
    <div className={twMerge(styles.phone, `relative`)}>
      <div className={styles.phoneScreen}>
        <div
          className="relative"
          style={{ height: gridSize.height, width: gridSize.width }}>
          <PlannedFeedItems
            currentUser={currentUser}
            downloadUrlByMediaItemId={downloadUrlByMediaItemId}
            onClickPlannedPost={handleClickPlannedPost}
            plannedPosts={plannedPosts}
            selectedPlannedPosts={selectedPlannedPosts}
          />
          <ActualFeedItems
            actualPosts={actualPosts}
            startIndex={plannedPosts.length}
          />
        </div>
      </div>
      {selectedPlannedPosts.length > 0 && (
        <PlannedPostActions selectedPlannedPosts={selectedPlannedPosts} />
      )}
    </div>
  );
};

export default FeedGrid;
