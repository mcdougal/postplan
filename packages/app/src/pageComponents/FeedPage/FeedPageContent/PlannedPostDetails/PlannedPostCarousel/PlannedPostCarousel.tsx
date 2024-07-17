import { getFirstMediaItem, getMediaItems } from '@/common/plannedPosts';
import { PlannedPost } from '@/server/plannedPosts';
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from '@heroicons/react/24/solid';
import Image from 'next/image';

import { IconButton } from '@/app/components';

import { Carousel } from '../useCarousel';

import getSizes from './getSizes';

type Props = {
  carousel: Carousel;
  fullSizeUrlByMediaItemId: Map<string, string>;
  plannedPost: PlannedPost;
};

const PlannedPostCarousel = ({
  carousel,
  fullSizeUrlByMediaItemId,
  plannedPost,
}: Props): React.ReactElement => {
  const firstMediaItem = getFirstMediaItem(plannedPost);
  const sizes = getSizes(firstMediaItem);

  return (
    <div
      className="relative flex h-[620px] items-center overflow-hidden bg-black"
      style={{
        height: `${sizes.container.height}px`,
        width: `${sizes.container.width}px`,
      }}>
      {getMediaItems(plannedPost).map((mediaItem, i) => {
        const downloadUrl = fullSizeUrlByMediaItemId.get(mediaItem.id);
        const left =
          sizes.image.width * i - carousel.currentIndex * sizes.image.width;

        return (
          <div
            key={mediaItem.id}
            className="absolute transition-all"
            style={{
              height: `${sizes.image.height}px`,
              left: `${left}px`,
              width: `${sizes.image.width}px`,
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
      {carousel.previous && (
        <IconButton
          className="absolute left-2 top-1/2 -translate-y-1/2 text-white opacity-70 shadow-sm"
          icon={ArrowLeftCircleIcon}
          label="Previous"
          onClick={carousel.previous}
          size="2xl"
        />
      )}
      {carousel.next && (
        <IconButton
          className="absolute right-2 top-1/2 -translate-y-1/2 text-white opacity-70 shadow-sm"
          icon={ArrowRightCircleIcon}
          label="Previous"
          onClick={carousel.next}
          size="2xl"
        />
      )}
    </div>
  );
};

export default PlannedPostCarousel;
