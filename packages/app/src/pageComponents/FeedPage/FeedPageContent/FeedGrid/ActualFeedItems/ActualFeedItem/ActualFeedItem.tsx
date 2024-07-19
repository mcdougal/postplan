'use client';

import { ActualPost } from '@/server/instagram';
import Image from 'next/image';

import getTypeIcon from './getTypeIcon';

type Props = {
  actualPost: ActualPost;
  bounds: { height: number; width: number; x: number; y: number };
  onClick: () => void;
};

const ActualFeedItem = ({
  actualPost,
  bounds,
  onClick,
}: Props): React.ReactElement => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const TypeIcon = getTypeIcon(actualPost);

  return (
    <button
      className="absolute transition-all"
      onClick={onClick}
      style={{
        height: `${bounds.height}px`,
        left: `${bounds.x}px`,
        top: `${bounds.y}px`,
        width: `${bounds.width}px`,
      }}>
      <Image
        alt={actualPost.caption || `Instagram post thumbnail`}
        fill
        src={actualPost.mediaThumbnailUrl || actualPost.mediaUrl}
        style={{ objectFit: `cover`, objectPosition: `center` }}
        unoptimized
      />
      {TypeIcon && <TypeIcon className="absolute right-2 top-2 h-4 w-4" />}
    </button>
  );
};

export default ActualFeedItem;
