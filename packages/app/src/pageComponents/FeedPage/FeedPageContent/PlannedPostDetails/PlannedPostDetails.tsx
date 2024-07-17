'use client';

import { getFirstMediaItem } from '@/common/plannedPosts';
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
  fullSizeUrlByMediaItemId: Map<string, string>;
  plannedPost: PlannedPost;
  setOptimisticPlannedPosts: Dispatch<SetStateAction<Array<PlannedPost>>>;
  thumbnailUrlByMediaItemId: Map<string, string>;
};

const PlannedPostDetails = ({
  currentUser,
  fullSizeUrlByMediaItemId,
  plannedPost,
  setOptimisticPlannedPosts,
  thumbnailUrlByMediaItemId,
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
            fullSizeUrlByMediaItemId={fullSizeUrlByMediaItemId}
            plannedPost={plannedPost}
          />
          <PlannedPostEditor
            carouselSizes={carouselSizes}
            currentUser={currentUser}
            plannedPost={plannedPost}
            setOptimisticPlannedPosts={setOptimisticPlannedPosts}
          />
        </div>
      </div>
      <MediaItemReorder
        carousel={carousel}
        currentUser={currentUser}
        plannedPost={plannedPost}
        setOptimisticPlannedPosts={setOptimisticPlannedPosts}
        thumbnailUrlByMediaItemId={thumbnailUrlByMediaItemId}
      />
    </div>
  );
};

export default PlannedPostDetails;
