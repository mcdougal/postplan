import { PlannedPost } from '@/server/plannedPosts';
import { useState } from 'react';

import { Textarea } from '@/app/components';

import PlannedPostCarousel from './PlannedPostCarousel';

type Props = {
  fullSizeUrlByMediaItemId: Map<string, string>;
  plannedPost: PlannedPost;
};

const PlannedPostDetails = ({
  fullSizeUrlByMediaItemId,
  plannedPost,
}: Props): React.ReactElement => {
  const [caption, setCaption] = useState(plannedPost.caption);

  return (
    <div key={plannedPost.id} className="flex">
      <PlannedPostCarousel
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
  );
};

export default PlannedPostDetails;
