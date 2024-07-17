import { getMediaItems } from '@/common/plannedPosts';
import { PlannedPost } from '@/server/plannedPosts';
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from '@heroicons/react/24/solid';
import Image from 'next/image';

import { IconButton } from '@/app/components';

import { CarouselSizes } from '../getCarouselSizes';
import { Carousel } from '../useCarousel';

type Props = {
  carousel: Carousel;
  carouselSizes: CarouselSizes;
  fullSizeUrlByMediaItemId: Map<string, string>;
  plannedPost: PlannedPost;
};

const PlannedPostCarousel = ({
  carousel,
  carouselSizes,
  fullSizeUrlByMediaItemId,
  plannedPost,
}: Props): React.ReactElement => {
  return (
    <div
      className="relative flex h-[620px] items-center overflow-hidden bg-black"
      style={{
        height: `${carouselSizes.container.height}px`,
        flex: `0 0 ${carouselSizes.container.width}px`,
        width: `${carouselSizes.container.width}px`,
      }}>
      {getMediaItems(plannedPost).map((mediaItem, i) => {
        const downloadUrl = fullSizeUrlByMediaItemId.get(mediaItem.id);
        const left =
          carouselSizes.image.width * i -
          carousel.currentIndex * carouselSizes.image.width;

        return (
          <div
            key={mediaItem.id}
            className="absolute transition-all"
            style={{
              height: `${carouselSizes.image.height}px`,
              left: `${left}px`,
              width: `${carouselSizes.image.width}px`,
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
