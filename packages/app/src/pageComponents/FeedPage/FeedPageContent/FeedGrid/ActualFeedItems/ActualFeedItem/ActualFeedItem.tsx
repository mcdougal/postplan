'use client';

import { InstagramMediaItem } from '@/server/instagram';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import getTypeIcon from './getTypeIcon';

type Props = {
  actualPost: InstagramMediaItem;
  bounds: { height: number; width: number; x: number; y: number };
};

const ActualFeedItem = ({ actualPost, bounds }: Props): React.ReactElement => {
  // Fixes bug where image would not render on page load for some reason
  const [shouldRenderImage, setShouldRenderImage] = useState(false);

  useEffect(() => {
    setShouldRenderImage(true);
  }, []);

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const TypeIcon = getTypeIcon(actualPost);

  return (
    <div
      className="absolute"
      style={{
        height: `${bounds.height}px`,
        left: `${bounds.x}px`,
        top: `${bounds.y}px`,
        width: `${bounds.width}px`,
      }}>
      {shouldRenderImage && (
        <Image
          alt={actualPost.caption || `Instagram post thumbnail`}
          fill
          sizes="250px"
          src={`/upload/deanna-troy-travels/instagram/${actualPost.id}`}
          style={{ objectFit: `cover`, objectPosition: `center` }}
        />
      )}
      {TypeIcon && <TypeIcon className="absolute right-2 top-2 h-4 w-4" />}
    </div>
  );
};

export default ActualFeedItem;
