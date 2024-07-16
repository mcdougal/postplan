import { getMediaItems } from '@/common/plannedPosts';
import { PlannedPost } from '@/server/plannedPosts';
import { useState } from 'react';

type Slide = {
  currentIndex: number;
  onNext: (() => void) | null;
  onPrevious: (() => void) | null;
};

export default (plannedPost: PlannedPost): Slide => {
  const [currentMediaItemIndex, setCurrentMediaItemIndex] = useState(0);

  const nextIndex =
    currentMediaItemIndex >= getMediaItems(plannedPost).length - 1
      ? null
      : currentMediaItemIndex + 1;

  const previousIndex =
    currentMediaItemIndex === 0 ? null : currentMediaItemIndex - 1;

  const onNext =
    nextIndex !== null
      ? (): void => {
          setCurrentMediaItemIndex(nextIndex);
        }
      : null;

  const onPrevious =
    previousIndex !== null
      ? (): void => {
          setCurrentMediaItemIndex(previousIndex);
        }
      : null;

  return {
    currentIndex: currentMediaItemIndex,
    onNext,
    onPrevious,
  };
};
