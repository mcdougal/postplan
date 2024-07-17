import { isCarousel, isReel } from '@/common/plannedPosts';
import { PlannedPost } from '@/server/plannedPosts';

import { CarouselIcon, ReelIcon } from '@/app/components';

export default (
  plannedPost: PlannedPost
): ((props: { className?: string }) => React.ReactNode) | null => {
  if (isReel(plannedPost)) {
    return ReelIcon;
  }

  if (isCarousel(plannedPost)) {
    return CarouselIcon;
  }

  return null;
};
