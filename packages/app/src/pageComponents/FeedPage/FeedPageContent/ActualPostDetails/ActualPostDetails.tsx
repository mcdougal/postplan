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
    <div className="flex flex-1 justify-center">
      <div className="relative w-full max-w-[900px] flex-1 bg-white shadow-2xl">
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
    </div>
  );
};

export default ActualPostDetails;
