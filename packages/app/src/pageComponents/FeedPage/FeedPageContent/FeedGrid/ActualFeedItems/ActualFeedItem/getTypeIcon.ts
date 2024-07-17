import { InstagramMediaItem } from '@/server/instagram';

import { CarouselIcon, ReelIcon } from '@/app/components';

export default (
  actualPost: InstagramMediaItem
): ((props: { className?: string }) => React.ReactNode) | null => {
  if (actualPost.mediaType === `VIDEO`) {
    return ReelIcon;
  }

  if (actualPost.mediaType === `CAROUSEL_ALBUM`) {
    return CarouselIcon;
  }

  return null;
};
