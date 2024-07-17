import { getMediaItems } from '@/common/plannedPosts';
import { PlannedPost } from '@/server/plannedPosts';
import { useEffect, useState } from 'react';

export type Carousel = {
  currentIndex: number;
  jump: (index: number) => void;
  next: (() => void) | null;
  previous: (() => void) | null;
};

export default (plannedPost: PlannedPost): Carousel => {
  const [currentMediaItemIndex, setCurrentMediaItemIndex] = useState(0);
  const mediaItems = getMediaItems(plannedPost);
  const numMediaItems = mediaItems.length;

  useEffect(() => {
    if (currentMediaItemIndex >= numMediaItems) {
      setCurrentMediaItemIndex(numMediaItems - 1);
    }
  }, [currentMediaItemIndex, numMediaItems]);

  const nextIndex =
    currentMediaItemIndex >= mediaItems.length - 1
      ? null
      : currentMediaItemIndex + 1;

  const previousIndex =
    currentMediaItemIndex === 0 ? null : currentMediaItemIndex - 1;

  const jump = (index: number): void => {
    if (index >= 0 && index < mediaItems.length) {
      setCurrentMediaItemIndex(index);
    }
  };

  const next =
    nextIndex !== null
      ? (): void => {
          setCurrentMediaItemIndex(nextIndex);
        }
      : null;

  const previous =
    previousIndex !== null
      ? (): void => {
          setCurrentMediaItemIndex(previousIndex);
        }
      : null;

  return {
    currentIndex: currentMediaItemIndex,
    jump,
    next,
    previous,
  };
};
