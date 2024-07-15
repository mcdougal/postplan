'use client';

import { CurrentUser } from '@/common/users';
import { InstagramMediaItem } from '@/server/instagram';
import { PlannedPost } from '@/server/plannedPosts';
import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

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
  const phoneContainerRef = useRef<HTMLDivElement>(null);

  const [optimisticPlannedPosts, setOptimisticPlannedPosts] =
    useState(plannedPosts);

  useEffect(() => {
    setOptimisticPlannedPosts(plannedPosts);
  }, [plannedPosts]);

  const gridSize = getGridSize({
    numItems: actualPosts.length + optimisticPlannedPosts.length,
  });

  return (
    <div ref={phoneContainerRef} className={twMerge(styles.phone, `relative`)}>
      <div className={styles.phoneScreen}>
        <div
          className="relative"
          style={{ height: gridSize.height, width: gridSize.width }}>
          <PlannedFeedItems
            currentUser={currentUser}
            downloadUrlByMediaItemId={downloadUrlByMediaItemId}
            optimisticPlannedPosts={optimisticPlannedPosts}
            phoneContainerRef={phoneContainerRef}
            setOptimisticPlannedPosts={setOptimisticPlannedPosts}
          />
          <ActualFeedItems
            actualPosts={actualPosts}
            startIndex={optimisticPlannedPosts.length}
          />
        </div>
      </div>
    </div>
  );
};

export default FeedGrid;
