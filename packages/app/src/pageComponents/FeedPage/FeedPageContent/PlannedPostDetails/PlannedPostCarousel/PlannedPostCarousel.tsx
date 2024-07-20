import { getMediaItems } from '@/common/plannedPosts';
import { PlannedPost } from '@/server/plannedPosts';
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from '@heroicons/react/24/solid';
import Image from 'next/image';
import { CSSProperties } from 'react';

import { IconButton } from '@/app/components';

import { Carousel } from '../useCarousel';

type Props = {
  carousel: Carousel;
  plannedPost: PlannedPost;
  sizeStyles: CSSProperties;
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
        height: sizeStyles.height,
        maxHeight: sizeStyles.maxHeight,
        aspectRatio: sizeStyles.aspectRatio,
      }}>
      {getMediaItems(plannedPost).map((mediaItem, i) => {
        const relativeIndex = i - carousel.currentIndex;

        return (
          <div
            key={mediaItem.id}
            className="absolute transition-all"
            style={{
              height: sizeStyles.height,
              maxHeight: sizeStyles.maxHeight,
              aspectRatio: sizeStyles.aspectRatio,
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
