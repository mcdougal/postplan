'use client';

import { CurrentUser } from '@/common/users';
import { InstagramMediaItem } from '@/server/instagram';
import { PlannedPost } from '@/server/plannedPosts';
import { useEffect, useState } from 'react';

import FeedGrid from './FeedGrid';
import PlannedPostDetails from './PlannedPostDetails';
import usePlannedPostsSelector from './usePlannedPostsSelector';

type Props = {
  actualPosts: Array<InstagramMediaItem>;
  currentUser: CurrentUser;
  fullSizeUrlByMediaItemId: Map<string, string>;
  plannedPosts: Array<PlannedPost>;
  thumbnailUrlByMediaItemId: Map<string, string>;
};

const FeedPageContent = ({
  actualPosts,
  currentUser,
  fullSizeUrlByMediaItemId,
  plannedPosts,
  thumbnailUrlByMediaItemId,
}: Props): React.ReactElement => {
  const [optimisticPlannedPosts, setOptimisticPlannedPosts] =
    useState(plannedPosts);

  useEffect(() => {
    setOptimisticPlannedPosts(plannedPosts);
  }, [plannedPosts]);

  const { onSelectPlannedPost, selectedPlannedPost } = usePlannedPostsSelector(
    optimisticPlannedPosts
  );

  return (
    <div>
      <div className="absolute bottom-0 left-0 right-1/2 top-0 flex justify-end px-6 pt-24">
        <FeedGrid
          actualPosts={actualPosts}
          currentUser={currentUser}
          onSelectPlannedPost={onSelectPlannedPost}
          optimisticPlannedPosts={optimisticPlannedPosts}
          setOptimisticPlannedPosts={setOptimisticPlannedPosts}
          thumbnailUrlByMediaItemId={thumbnailUrlByMediaItemId}
        />
      </div>
      <div className="absolute bottom-0 left-1/2 right-0 top-0 flex px-6 pt-24">
        {selectedPlannedPost && (
          <PlannedPostDetails
            fullSizeUrlByMediaItemId={fullSizeUrlByMediaItemId}
            plannedPost={selectedPlannedPost}
          />
        )}
      </div>
    </div>
  );
};

export default FeedPageContent;
