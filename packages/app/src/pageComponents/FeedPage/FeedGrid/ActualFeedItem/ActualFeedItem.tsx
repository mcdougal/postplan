import { InstagramMediaItem } from '@/domain/instagram/server';
import Image from 'next/image';

type Props = {
  actualPost: InstagramMediaItem;
};

const ActualFeedItem = ({ actualPost }: Props): React.ReactElement => {
  return (
    <div className="relative h-[106px] w-[106px] bg-gray-200">
      <Image
        alt={actualPost.caption || `Instagram post thumbnail`}
        fill
        sizes="250px"
        src={`/upload/deanna-troy-travels/instagram/${actualPost.id}`}
        style={{ objectFit: `cover`, objectPosition: `center` }}
      />
    </div>
  );
};

export default ActualFeedItem;
