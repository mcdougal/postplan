import { isCarousel } from '@/common/plannedPosts';
import { PlannedPost } from '@/server/plannedPosts';

import { CarouselIcon } from '@/app/components';

export default (
  plannedPost: PlannedPost
): ((props: { className?: string }) => React.ReactNode) | null => {
  if (isCarousel(plannedPost)) {
    return CarouselIcon;
  }

  return null;
};
