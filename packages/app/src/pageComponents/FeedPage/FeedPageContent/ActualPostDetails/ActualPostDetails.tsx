import { InstagramMediaItem } from '@/server/instagram';

import { Typography } from '@/app/components';

import ActualPostCarousel from './ActualPostCarousel';
import getCarouselSizes from './getCarouselSizes';
import useResolution from './useResolution';

type Props = {
  actualPost: InstagramMediaItem;
};

const ActualPostDetails = ({ actualPost }: Props): React.ReactElement => {
  const resolution = useResolution(actualPost);
  const carouselSizes = getCarouselSizes(resolution);

  return (
    <div className="max-w-full flex-1 bg-white">
      {resolution && (
        <div className="flex">
          <ActualPostCarousel
            actualPost={actualPost}
            carouselSizes={carouselSizes}
          />
          <div
            className="relative flex-1"
            style={{
              height: `${carouselSizes.container.height}px`,
            }}>
            <div
              className="overflow-auto px-6 py-4"
              style={{
                height: `${carouselSizes.container.height}px`,
              }}>
              {actualPost.caption ? (
                <Typography
                  className="break-anywhere whitespace-pre-wrap leading-5"
                  size="sm">
                  {actualPost.caption}
                </Typography>
              ) : (
                <Typography color="gray" size="sm">
                  No caption
                </Typography>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActualPostDetails;
