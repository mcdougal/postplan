'use client';

import { getFirstMediaItem, isReel } from '@/common/plannedPosts';
import { CurrentUser } from '@/common/users';
import { PlannedPost } from '@/server/plannedPosts';
import { Dispatch, SetStateAction } from 'react';

import getSizeStyles from './getSizeStyles';
import MediaItemReorder from './MediaItemReorder';
import PlannedPostCarousel from './PlannedPostCarousel';
import PlannedPostEditor from './PlannedPostEditor';
import useCarousel from './useCarousel';

type Props = {
  currentUser: CurrentUser;
  plannedPost: PlannedPost;
  setOptimisticPlannedPosts: Dispatch<SetStateAction<Array<PlannedPost>>>;
};

const PlannedPostDetails = ({
  currentUser,
  plannedPost,
  setOptimisticPlannedPosts,
}: Props): React.ReactElement => {
  const carousel = useCarousel(plannedPost);
  const firstMediaItem = getFirstMediaItem(plannedPost);
  const sizeStyles = getSizeStyles(firstMediaItem);

  return (
    <div className="relative flex flex-1 flex-col gap-2">
      <div
        className="max-w-full flex-1 bg-white"
        style={{
          height: sizeStyles.container.height,
          maxHeight: sizeStyles.container.maxHeight,
        }}>
        <div className="flex">
          <PlannedPostCarousel
            carousel={carousel}
            plannedPost={plannedPost}
            sizeStyles={sizeStyles}
          />
          <PlannedPostEditor
            plannedPost={plannedPost}
            setOptimisticPlannedPosts={setOptimisticPlannedPosts}
            sizeStyles={sizeStyles}
          />
        </div>
      </div>
      {!isReel(plannedPost) && (
        <MediaItemReorder
          carousel={carousel}
          currentUser={currentUser}
          plannedPost={plannedPost}
          setOptimisticPlannedPosts={setOptimisticPlannedPosts}
        />
      )}
    </div>
  );
};

export default PlannedPostDetails;
