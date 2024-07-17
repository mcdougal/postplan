import { CurrentUser } from '@/common/users';
import { PlannedPost } from '@/server/plannedPosts';
import { Dispatch, SetStateAction, useState } from 'react';

import { Textarea } from '@/app/components';

import MediaItemReorder from './MediaItemReorder';
import PlannedPostCarousel from './PlannedPostCarousel';
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
  const [caption, setCaption] = useState(plannedPost.caption);
  const carousel = useCarousel(plannedPost);

  return (
    <div className="flex flex-1 flex-col gap-2">
      <div className="max-w-full flex-1 bg-white">
        <div className="flex">
          <PlannedPostCarousel
            carousel={carousel}
            fullSizeUrlByMediaItemId={fullSizeUrlByMediaItemId}
            plannedPost={plannedPost}
          />
          <div className="px-6 py-4">
            <Textarea
              onChange={(event) => {
                setCaption(event.target.value || null);
              }}
              placeholder="Write a caption..."
              rows={10}
              value={caption || ``}
            />
          </div>
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
