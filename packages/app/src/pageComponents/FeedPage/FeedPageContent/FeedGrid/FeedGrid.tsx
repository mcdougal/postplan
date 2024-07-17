'use client';

import { CurrentUser } from '@/common/users';
import { InstagramMediaItem } from '@/server/instagram';
import { PlannedPost } from '@/server/plannedPosts';
import { Dispatch, SetStateAction } from 'react';
import { twMerge } from 'tailwind-merge';

import { ActualPostHider } from '../useActualPostHider';
import { SelectedPostId } from '../usePostSelector';

import ActualFeedItems from './ActualFeedItems';
import styles from './FeedGrid.module.css';
import { getGridSize } from './gridPositioning';
import PlannedFeedItems from './PlannedFeedItems';

type Props = {
  actualPostHider: ActualPostHider;
  actualPosts: Array<InstagramMediaItem>;
  currentUser: CurrentUser;
  onSelectPost: (selectedPostId: SelectedPostId) => void;
  optimisticPlannedPosts: Array<PlannedPost>;
  setOptimisticPlannedPosts: Dispatch<SetStateAction<Array<PlannedPost>>>;
  thumbnailUrlByMediaItemId: Map<string, string>;
};

const FeedGrid = ({
  actualPostHider,
  actualPosts,
  currentUser,
  onSelectPost,
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
              onSelectPost={onSelectPost}
              optimisticPlannedPosts={optimisticPlannedPosts}
              setOptimisticPlannedPosts={setOptimisticPlannedPosts}
              thumbnailUrlByMediaItemId={thumbnailUrlByMediaItemId}
            />
            <ActualFeedItems
              actualPostHider={actualPostHider}
              actualPosts={actualPosts}
              onSelectPost={onSelectPost}
              startIndex={optimisticPlannedPosts.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedGrid;
