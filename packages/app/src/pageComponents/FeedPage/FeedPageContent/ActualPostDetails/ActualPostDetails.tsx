import { ActualPost } from '@/server/instagram';

import { ActualPostHider } from '../useActualPostHider';

import ActualPostCarousel from './ActualPostCarousel';
import ActualPostDetailsCaption from './ActualPostDetailsCaption';
import getCarouselSizes from './getCarouselSizes';
import useResolution from './useResolution';

type Props = {
  actualPost: ActualPost;
  actualPostHider: ActualPostHider;
};

const ActualPostDetails = ({
  actualPost,
  actualPostHider,
}: Props): React.ReactElement => {
  const resolution = useResolution(actualPost);
  const carouselSizes = getCarouselSizes(resolution);

  return (
    <div className="relative max-w-full flex-1 bg-white">
      {resolution && (
        <>
          <div className="flex">
            <ActualPostCarousel
              actualPost={actualPost}
              carouselSizes={carouselSizes}
            />
            <ActualPostDetailsCaption
              actualPost={actualPost}
              actualPostHider={actualPostHider}
              carouselSizes={carouselSizes}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ActualPostDetails;
