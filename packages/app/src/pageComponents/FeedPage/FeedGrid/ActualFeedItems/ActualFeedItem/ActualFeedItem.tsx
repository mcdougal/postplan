'use client';

import { InstagramMediaItem } from '@/server/instagram';
import Image from 'next/image';
import { useEffect, useState } from 'react';

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
    </div>
  );
};

export default ActualFeedItem;
