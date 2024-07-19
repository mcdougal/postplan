import { InstagramMediaItem } from '@/server/instagram';
import Image from 'next/image';

import { CarouselSizes } from '../getCarouselSizes';

type Props = {
  actualPost: InstagramMediaItem;
  carouselSizes: CarouselSizes;
};

const ActualPostCarousel = ({
  actualPost,
  carouselSizes,
}: Props): React.ReactElement => {
  return (
    <div
      className="relative flex h-[620px] items-center overflow-hidden bg-black"
      style={{
        height: `${carouselSizes.container.height}px`,
        flex: `0 0 ${carouselSizes.container.width}px`,
        width: `${carouselSizes.container.width}px`,
      }}>
      <div
        className="absolute transition-all"
        style={{
          height: `${carouselSizes.image.height}px`,
          left: `0px`,
          width: `${carouselSizes.image.width}px`,
        }}>
        <Image
          alt={actualPost.caption || `Instagram post thumbnail`}
          fill
          src={actualPost.thumbnailUrl || actualPost.mediaUrl}
          style={{ objectFit: `cover`, objectPosition: `center` }}
          unoptimized
        />
      </div>
    </div>
  );
};

export default ActualPostCarousel;
