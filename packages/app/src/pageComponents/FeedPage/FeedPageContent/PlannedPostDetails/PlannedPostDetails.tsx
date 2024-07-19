'use client';

import { getFirstMediaItem, isReel } from '@/common/plannedPosts';
import { CurrentUser } from '@/common/users';
import { PlannedPost } from '@/server/plannedPosts';
import { Dispatch, SetStateAction } from 'react';

import getCarouselSizes from './getCarouselSizes';
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
  const carouselSizes = getCarouselSizes(firstMediaItem);

  return (
    <div className="flex flex-1 flex-col gap-2">
      <div className="max-w-full flex-1 bg-white">
        <div className="flex">
          <PlannedPostCarousel
            carousel={carousel}
            carouselSizes={carouselSizes}
            plannedPost={plannedPost}
          />
          <PlannedPostEditor
            carouselSizes={carouselSizes}
            plannedPost={plannedPost}
            setOptimisticPlannedPosts={setOptimisticPlannedPosts}
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
