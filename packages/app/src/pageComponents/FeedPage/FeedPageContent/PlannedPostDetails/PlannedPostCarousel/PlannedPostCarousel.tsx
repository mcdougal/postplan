import { PlannedPost } from '@/server/plannedPosts';
import Image from 'next/image';
import { useState } from 'react';

import { getCarouselSize, getItemBounds } from '../carouselPositioning';

type Props = {
  fullSizeUrlByMediaItemId: Map<string, string>;
  plannedPost: PlannedPost;
};

const PlannedPostCarousel = ({
  fullSizeUrlByMediaItemId,
  plannedPost,
}: Props): React.ReactElement => {
  const [currentMediaItemIndex, setCurrentMediaItemIndex] = useState(0);
  const carouselSize = getCarouselSize({
    numItems: plannedPost.mediaItems.length,
  });

  return (
    <div
      className="relative overflow-hidden rounded-xl"
      style={{
        height: `${carouselSize.height}px`,
        width: `${carouselSize.width}px`,
      }}>
      {plannedPost.mediaItems.map((mediaItem, i) => {
        const bounds = getItemBounds({ index: i });
        const downloadUrl = fullSizeUrlByMediaItemId.get(mediaItem.id);

        return (
          <div
            key={mediaItem.id}
            className="absolute"
            style={{
              height: `${bounds.height}px`,
              left: `${bounds.x}px`,
              top: `${bounds.y}px`,
              width: `${bounds.width}px`,
            }}>
            {downloadUrl && (
              <Image
                alt={plannedPost.caption || `Planned post thumbnail`}
                fill
                priority
                src={downloadUrl}
                style={{ objectFit: `cover`, objectPosition: `center` }}
                unoptimized
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PlannedPostCarousel;
