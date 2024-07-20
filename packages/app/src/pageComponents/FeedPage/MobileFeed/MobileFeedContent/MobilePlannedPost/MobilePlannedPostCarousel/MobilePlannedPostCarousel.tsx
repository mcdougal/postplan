import { getMediaItems } from '@/common/plannedPosts';
import { PlannedPost } from '@/server/plannedPosts';
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from '@heroicons/react/24/solid';
import Image from 'next/image';

import { IconButton } from '@/app/components';

import { Carousel } from '../useCarousel';

type Props = {
  carousel: Carousel;
  plannedPost: PlannedPost;
};

const MobilePlannedPostCarousel = ({
  carousel,
  plannedPost,
}: Props): React.ReactElement => {
  return (
    <div className="relative flex aspect-square w-full items-center overflow-hidden bg-black">
      {getMediaItems(plannedPost).map((mediaItem, i) => {
        const relativeIndex = i - carousel.currentIndex;

        return (
          <div
            key={mediaItem.id}
            className="absolute aspect-square w-full transition-all"
            style={{
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

export default MobilePlannedPostCarousel;
