'use client';

import { CurrentUser } from '@/common/users';
import { InstagramMediaItem } from '@/server/instagram';
import { PlannedPost } from '@/server/plannedPosts';
import { twMerge } from 'tailwind-merge';

import ActualFeedItems from './ActualFeedItems';
import styles from './FeedGrid.module.css';
import { getGridSize } from './gridPositioning';
import PlannedFeedItems from './PlannedFeedItems';

type Props = {
  actualPosts: Array<InstagramMediaItem>;
  currentUser: CurrentUser;
  onSelectPlannedPost: (plannedPost: PlannedPost) => void;
  optimisticPlannedPosts: Array<PlannedPost>;
  setOptimisticPlannedPosts: (plannedPosts: Array<PlannedPost>) => void;
  thumbnailUrlByMediaItemId: Map<string, string>;
};

const FeedGrid = ({
  actualPosts,
  currentUser,
  onSelectPlannedPost,
  optimisticPlannedPosts,
  setOptimisticPlannedPosts,
  thumbnailUrlByMediaItemId,
}: Props): React.ReactElement => {
  const gridSize = getGridSize({
    numItems: actualPosts.length + optimisticPlannedPosts.length,
  });

  return (
    <div>
      <div className={twMerge(styles.phone, `relative px-2 pb-2 pt-12`)}>
        <div className={styles.phoneScreen}>
          <div
            className="relative"
            style={{ height: gridSize.height, width: gridSize.width }}>
            <PlannedFeedItems
              currentUser={currentUser}
              onSelectPlannedPost={onSelectPlannedPost}
              optimisticPlannedPosts={optimisticPlannedPosts}
              setOptimisticPlannedPosts={setOptimisticPlannedPosts}
              thumbnailUrlByMediaItemId={thumbnailUrlByMediaItemId}
            />
            <ActualFeedItems
              actualPosts={actualPosts}
              startIndex={optimisticPlannedPosts.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedGrid;
