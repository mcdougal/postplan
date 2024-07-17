import { InstagramMediaItem } from '@/server/instagram';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

import { Button, Typography } from '@/app/components';

import { ActualPostHider } from '../../useActualPostHider';
import { CarouselSizes } from '../getCarouselSizes';

type Props = {
  actualPost: InstagramMediaItem;
  actualPostHider: ActualPostHider;
  carouselSizes: CarouselSizes;
};

const ActualPostDetailsCaption = ({
  actualPost,
  actualPostHider,
  carouselSizes,
}: Props): React.ReactElement => {
  const isHidden = actualPostHider.hiddenPostIds.has(actualPost.id);

  return (
    <div
      className="relative flex-1"
      style={{
        height: `${carouselSizes.container.height}px`,
      }}>
      <div
        className="overflow-auto px-6 py-4"
        style={{
          height: `${carouselSizes.container.height - 56}px`,
        }}>
        {actualPost.caption ? (
          <Typography
            className="break-anywhere whitespace-pre-wrap leading-4"
            size="sm">
            {actualPost.caption}
          </Typography>
        ) : (
          <Typography color="gray" size="sm">
            No caption
          </Typography>
        )}
      </div>
      <div className="flex h-14 items-center gap-2 bg-white pl-6 pr-3">
        <Button
          color="secondary"
          onClick={() => {
            actualPostHider.hidePost(actualPost.id, !isHidden);
          }}
          size="sm"
          startIcon={isHidden ? EyeIcon : EyeSlashIcon}>
          {isHidden ? `Show Post` : `Hide Post`}
        </Button>
      </div>
    </div>
  );
};

export default ActualPostDetailsCaption;
