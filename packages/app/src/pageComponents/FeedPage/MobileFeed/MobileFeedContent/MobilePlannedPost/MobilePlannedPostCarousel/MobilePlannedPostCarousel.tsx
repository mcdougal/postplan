import { getMediaItems } from '@/common/plannedPosts';
import { PlannedPost } from '@/server/plannedPosts';
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useEffect, useMemo, useRef } from 'react';
import { Swiper } from 'swiper';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<Swiper | null>(null);
  const carouselJump = carousel.jump;

  useEffect(() => {
    if (containerRef.current) {
      swiperRef.current = new Swiper(containerRef.current, {
        on: {
          activeIndexChange: (swiper): void => {
            carouselJump(swiper.activeIndex);
          },
        },
      });
    }
  }, [carouselJump]);

  const carouselMemo = useMemo(() => {
    return (
      <div
        ref={containerRef}
        className="swiper relative flex aspect-square w-full items-center overflow-hidden bg-black">
        <div className="swiper-wrapper">
          {getMediaItems(plannedPost).map((mediaItem, i) => {
            // const relativeIndex = i - carousel.currentIndex;

            return (
              <div
                key={mediaItem.id}
                className="swiper-slide absolute aspect-square w-full transition-all"
                style={{
                  // transform: `translateX(${relativeIndex * 100}%)`,
                  transform: `translateX(${i * 100}%)`,
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
        </div>
      </div>
    );
  }, [plannedPost]);

  return (
    <div className="relative">
      {carouselMemo}
      {carousel.previous && (
        <IconButton
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 text-white opacity-70 shadow-sm"
          icon={ArrowLeftCircleIcon}
          iconStyle="circle"
          label="Previous"
          onClick={() => {
            if (carousel.previous) {
              carousel.previous();
            }
            if (swiperRef.current) {
              swiperRef.current.slidePrev();
            }
          }}
          size="2xl"
        />
      )}
      {carousel.next && (
        <IconButton
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 text-white opacity-70 shadow-sm"
          icon={ArrowRightCircleIcon}
          iconStyle="circle"
          label="Previous"
          onClick={() => {
            if (carousel.next) {
              carousel.next();
            }
            if (swiperRef.current) {
              swiperRef.current.slideNext();
            }
          }}
          size="2xl"
        />
      )}
    </div>
  );
};

export default MobilePlannedPostCarousel;
