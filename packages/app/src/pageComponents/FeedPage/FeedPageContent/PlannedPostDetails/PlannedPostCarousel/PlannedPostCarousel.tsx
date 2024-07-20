import { getMediaItems } from '@/common/plannedPosts';
import { PlannedPost } from '@/server/plannedPosts';
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from '@heroicons/react/24/solid';
import Image from 'next/image';

import { IconButton } from '@/app/components';

import { SizeStyles } from '../getSizeStyles';
import { Carousel } from '../useCarousel';

type Props = {
  carousel: Carousel;
  plannedPost: PlannedPost;
  sizeStyles: SizeStyles;
};

const PlannedPostCarousel = ({
  carousel,
  plannedPost,
  sizeStyles,
}: Props): React.ReactElement => {
  return (
    <div
      className="relative flex items-center overflow-hidden bg-black"
      style={{
        aspectRatio: sizeStyles.container.aspectRatio,
        height: sizeStyles.container.height,
        maxHeight: sizeStyles.container.maxHeight,
      }}>
      {getMediaItems(plannedPost).map((mediaItem, i) => {
        const relativeIndex = i - carousel.currentIndex;

        return (
          <div
            key={mediaItem.id}
            className="absolute transition-all"
            style={{
              aspectRatio: sizeStyles.image.aspectRatio,
              height: sizeStyles.image.height,
              maxHeight: sizeStyles.image.maxHeight,
              transform: `translateX(${relativeIndex * 100}%)`,
            }}>
            <Image
              alt={plannedPost.caption || `Planned post thumbnail`}
              fill
              priority
              src={mediaItem.mediaUrl}
              style={{ objectFit: `cover`, objectPosition: `center` }}
              unoptimized
            />
          </div>
        );
      })}
      {carousel.previous && (
        <IconButton
          className="absolute left-2 top-1/2 -translate-y-1/2 text-white opacity-70 shadow-sm"
          icon={ArrowLeftCircleIcon}
          iconStyle="circle"
          label="Previous"
          onClick={carousel.previous}
          size="2xl"
        />
      )}
      {carousel.next && (
        <IconButton
          className="absolute right-2 top-1/2 -translate-y-1/2 text-white opacity-70 shadow-sm"
          icon={ArrowRightCircleIcon}
          iconStyle="circle"
          label="Previous"
          onClick={carousel.next}
          size="2xl"
        />
      )}
    </div>
  );
};

export default PlannedPostCarousel;
