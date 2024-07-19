import { ActualPost } from '@/server/instagram';

import { CarouselIcon, ReelIcon } from '@/app/components';

export default (
  actualPost: ActualPost
): ((props: { className?: string }) => React.ReactNode) | null => {
  if (actualPost.mediaType === `Video`) {
    return ReelIcon;
  }

  if (actualPost.mediaType === `CarouselAlbum`) {
    return CarouselIcon;
  }

  return null;
};
