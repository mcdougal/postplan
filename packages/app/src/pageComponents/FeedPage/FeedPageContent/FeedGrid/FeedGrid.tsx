'use client';

import { CurrentUser } from '@/common/users';
import { ActualPost } from '@/server/instagram';
import { PlannedPost } from '@/server/plannedPosts';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { Dispatch, SetStateAction } from 'react';
import { twMerge } from 'tailwind-merge';

import { IconButton, Typography } from '@/app/components';

import { ActualPostHider } from '../useActualPostHider';
import { SelectedPostId } from '../usePostSelector';

import ActualFeedItems from './ActualFeedItems';
import styles from './FeedGrid.module.css';
import { getGridSize } from './gridPositioning';
import PlannedFeedItems from './PlannedFeedItems';

type Props = {
  actualPostHider: ActualPostHider;
  actualPosts: Array<ActualPost>;
  currentUser: CurrentUser;
  onRefreshPosts: (() => void) | null;
  onSelectPost: (selectedPostId: SelectedPostId) => void;
  optimisticPlannedPosts: Array<PlannedPost>;
  setOptimisticPlannedPosts: Dispatch<SetStateAction<Array<PlannedPost>>>;
};

const FeedGrid = ({
  actualPostHider,
  actualPosts,
  currentUser,
  onRefreshPosts,
  onSelectPost,
  optimisticPlannedPosts,
  setOptimisticPlannedPosts,
}: Props): React.ReactElement => {
  const gridSize = getGridSize({
    numItems: actualPosts.length + optimisticPlannedPosts.length,
  });

  return (
    <div className={twMerge(styles.phone, `relative px-2 pb-2 pt-0`)}>
      <div className="flex h-12 items-center justify-center gap-2">
        <Typography size="xs" weight="bold">
          {currentUser.instagramUsername}
        </Typography>
        <IconButton
          disabled={!onRefreshPosts}
          icon={ArrowPathIcon}
          iconStyle="icon"
          label="Load new posts"
          onClick={onRefreshPosts || undefined}
          size="sm"
        />
      </div>
      <div className={styles.phoneScreen}>
        <div
          className="relative"
          style={{ height: gridSize.height, width: gridSize.width }}>
          <PlannedFeedItems
            onSelectPost={onSelectPost}
            optimisticPlannedPosts={optimisticPlannedPosts}
            setOptimisticPlannedPosts={setOptimisticPlannedPosts}
          />
          <ActualFeedItems
            actualPostHider={actualPostHider}
            actualPosts={actualPosts}
            onSelectPost={onSelectPost}
            startIndex={optimisticPlannedPosts.length}
          />
        </div>
        {actualPosts.length === 0 && optimisticPlannedPosts.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center p-4 pb-32">
            <Typography className="text-center" color="gray" size="sm">
              Your feed is loading.
              <br />
              This may take a minute.
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedGrid;
