'use client';

import { CurrentUser } from '@/common/users';
import { ActualPost } from '@/server/instagram';
import { PlannedPost } from '@/server/plannedPosts';
import { useEffect, useState } from 'react';

import { Button } from '@/app/components';

import ActualPostDetails from './ActualPostDetails';
import AddPlannedPosts from './AddPlannedPosts';
import FeedGrid from './FeedGrid';
import PlannedPostDetails from './PlannedPostDetails';
import sliceActualPosts from './sliceActualPosts';
import useActualPostHider from './useActualPostHider';
import usePostSelector from './usePostSelector';

type Props = {
  actualPosts: Array<ActualPost>;
  currentUser: CurrentUser;
  plannedPosts: Array<PlannedPost>;
};

const FeedPageContent = ({
  actualPosts: allActualPosts,
  currentUser,
  plannedPosts,
}: Props): React.ReactElement => {
  const [optimisticPlannedPosts, setOptimisticPlannedPosts] =
    useState(plannedPosts);

  useEffect(() => {
    setOptimisticPlannedPosts(plannedPosts);
  }, [plannedPosts]);

  const actualPosts = sliceActualPosts(allActualPosts, optimisticPlannedPosts);

  const { selectedPost, selectPost } = usePostSelector(
    optimisticPlannedPosts,
    actualPosts
  );

  const actualPostHider = useActualPostHider();

  return (
    <div className="hidden min-h-[calc(100vh-48px)] lg:flex">
      <div className="tall:pb-[10vh] flex min-w-[480px] items-center justify-center px-6 pb-16">
        <FeedGrid
          actualPostHider={actualPostHider}
          actualPosts={actualPosts}
          onSelectPost={selectPost}
          optimisticPlannedPosts={optimisticPlannedPosts}
          setOptimisticPlannedPosts={setOptimisticPlannedPosts}
        />
        <div className="tall:bottom-8 tall:left-8 fixed bottom-4 left-4 flex items-center gap-3">
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
      <div className="tall:pb-[7vh] relative flex flex-1 items-center justify-center px-12">
        <div className="absolute inset-0 bg-black bg-opacity-70" />
        {((): React.ReactNode => {
          if (!selectedPost) {
            return null;
          }
          if (selectedPost?.type === `actual`) {
            return (
              <ActualPostDetails
                key={selectedPost.actualPost.instagramId}
                actualPost={selectedPost.actualPost}
                actualPostHider={actualPostHider}
              />
            );
          }
          if (selectedPost?.type === `planned`) {
            return (
              <PlannedPostDetails
                key={selectedPost.plannedPost.id}
                currentUser={currentUser}
                plannedPost={selectedPost.plannedPost}
                setOptimisticPlannedPosts={setOptimisticPlannedPosts}
              />
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
