import { InstagramMediaItem } from '@/server/instagram';
import { useEffect, useState } from 'react';

import { createImage } from '@/app/image';

export type Resolution = {
  height: number;
  width: number;
};

export default (actualPost: InstagramMediaItem): Resolution | null => {
  const [resolution, setResolution] = useState<Resolution | null>(null);

  useEffect(() => {
    if (actualPost.mediaType === `VIDEO`) {
      setResolution({ height: 620, width: 348 });
      return;
    }

    const run = async (): Promise<void> => {
      const image = await createImage(actualPost.mediaUrl);
      setResolution({
        height: image.height,
        width: image.width,
      });
    };
    run();
  }, [actualPost.mediaType, actualPost.mediaUrl]);

  return resolution;
};
