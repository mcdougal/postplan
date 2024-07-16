import { PlannedPost } from '@/server/plannedPosts';

import PlannedPostCarousel from './PlannedPostCarousel';

type Props = {
  fullSizeUrlByMediaItemId: Map<string, string>;
  plannedPost: PlannedPost;
};

const PlannedPostDetails = ({
  fullSizeUrlByMediaItemId,
  plannedPost,
}: Props): React.ReactElement => {
  return (
    <div>
      <PlannedPostCarousel
        fullSizeUrlByMediaItemId={fullSizeUrlByMediaItemId}
        plannedPost={plannedPost}
      />
    </div>
  );
};

export default PlannedPostDetails;
