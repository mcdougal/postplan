import { PlannedPost } from '@/server/plannedPosts';
import Image from 'next/image';
import { useState } from 'react';

import getAspectRatio from './getAspectRatio';
import getSizes from './getSizes';

type Props = {
  fullSizeUrlByMediaItemId: Map<string, string>;
  plannedPost: PlannedPost;
};

const PlannedPostCarousel = ({
  fullSizeUrlByMediaItemId,
  plannedPost,
}: Props): React.ReactElement => {
  const [currentMediaItemIndex, setCurrentMediaItemIndex] = useState(0);
  const sizes = getSizes(plannedPost.mediaItems[0]);

  return (
    <div
      className="relative flex h-[620px] items-center overflow-hidden bg-black"
      style={{
        height: `${sizes.container.height}px`,
        width: `${sizes.container.width}px`,
      }}>
      {plannedPost.mediaItems.map((mediaItem, i) => {
        const downloadUrl = fullSizeUrlByMediaItemId.get(mediaItem.id);

        return (
          <div
            key={mediaItem.id}
            className="absolute"
            style={{
              height: `${sizes.image.height}px`,
              left: `${sizes.image.width * i}px`,
              width: `${sizes.image.width}px`,
            }}>
            {downloadUrl && (
              <Image
                alt={plannedPost.caption || `Planned post thumbnail`}
                fill
                priority
                src={downloadUrl}
                style={{ objectFit: `contain`, objectPosition: `center` }}
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
