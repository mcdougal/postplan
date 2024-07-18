'use client';

import { CurrentUser } from '@/common/users';
import { InstagramMediaItem } from '@/server/instagram';
import { PlannedPost } from '@/server/plannedPosts';
import { useEffect, useState } from 'react';

import { Button } from '@/app/components';

import ActualPostDetails from './ActualPostDetails';
import AddPlannedPosts from './AddPlannedPosts';
import FeedGrid from './FeedGrid';
import PlannedPostDetails from './PlannedPostDetails';
import useActualPostHider from './useActualPostHider';
import usePostSelector from './usePostSelector';

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

  const { selectedPost, selectPost } = usePostSelector(
    optimisticPlannedPosts,
    actualPosts
  );

  const actualPostHider = useActualPostHider();

  return (
    <div>
      <div className="absolute bottom-0 left-0 right-2/3 top-12 flex items-center justify-center px-6 pb-16">
        <FeedGrid
          actualPostHider={actualPostHider}
          actualPosts={actualPosts}
          currentUser={currentUser}
          onSelectPost={selectPost}
          optimisticPlannedPosts={optimisticPlannedPosts}
          setOptimisticPlannedPosts={setOptimisticPlannedPosts}
          thumbnailUrlByMediaItemId={thumbnailUrlByMediaItemId}
        />
        <div className="fixed bottom-8 left-8 flex items-center gap-3">
          <AddPlannedPosts currentUser={currentUser} />
          {actualPostHider.hiddenPostIds.size > 0 && (
            <Button
              color="secondary"
              onClick={actualPostHider.unhideAllPosts}
              size="xl">
              Unhide Posts
            </Button>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 left-1/3 right-0 top-12 flex px-6">
        <div className="absolute inset-0 bg-black bg-opacity-70" />
        {((): React.ReactNode => {
          if (!selectedPost) {
            return null;
          }
          if (selectedPost?.type === `actual`) {
            return (
              <div
                key={selectedPost.actualPost.id}
                className="absolute inset-0 flex items-center p-12 pb-20">
                <ActualPostDetails
                  actualPost={selectedPost.actualPost}
                  actualPostHider={actualPostHider}
                />
              </div>
            );
          }
          if (selectedPost?.type === `planned`) {
            return (
              <div
                key={selectedPost.plannedPost.id}
                className="absolute inset-0 flex items-center p-12 pb-20">
                <PlannedPostDetails
                  currentUser={currentUser}
                  fullSizeUrlByMediaItemId={fullSizeUrlByMediaItemId}
                  plannedPost={selectedPost.plannedPost}
                  setOptimisticPlannedPosts={setOptimisticPlannedPosts}
                  thumbnailUrlByMediaItemId={thumbnailUrlByMediaItemId}
                />
              </div>
            );
          }
          const exhaustiveCheck: never = selectedPost;
          return exhaustiveCheck;
        })()}
      </div>
    </div>
  );
};

export default FeedPageContent;