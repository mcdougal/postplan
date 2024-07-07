'use client';

import { InstagramMediaItem } from '@/server/instagram';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type Props = {
  actualPost: InstagramMediaItem;
};

const ActualFeedItem = ({ actualPost }: Props): React.ReactElement => {
  // Fixes bug where image would not render on page load for some reason
  const [shouldRenderImage, setShouldRenderImage] = useState(false);

  useEffect(() => {
    setShouldRenderImage(true);
  }, []);

  return (
    <div className="relative h-[106px] w-[106px] bg-gray-200">
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
