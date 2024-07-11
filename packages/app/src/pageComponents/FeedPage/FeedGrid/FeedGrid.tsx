'use client';

import { CurrentUser } from '@/common/users';
import { InstagramMediaItem } from '@/server/instagram';
import { PlannedPost } from '@/server/plannedPosts';

import ActualFeedItems from './ActualFeedItems';
import styles from './FeedGrid.module.css';
import { getGridSize } from './gridPositioning';
import PlannedFeedItems from './PlannedFeedItems';

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

  return (
    <div className={styles.phone}>
      <div className={styles.phoneScreen}>
        <div
          className="relative"
          style={{ height: gridSize.height, width: gridSize.width }}>
          <PlannedFeedItems
            currentUser={currentUser}
            downloadUrlByMediaItemId={downloadUrlByMediaItemId}
            plannedPosts={plannedPosts}
          />
          <ActualFeedItems
            actualPosts={actualPosts}
            startIndex={plannedPosts.length}
          />
        </div>
      </div>
    </div>
  );
};

export default FeedGrid;
