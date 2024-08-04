import { ActualPost } from '@/server/instagram';
import { useEffect, useState } from 'react';

import { createImage } from '@/app/image';

export type Resolution = {
  height: number;
  width: number;
};

export default (actualPost: ActualPost): Resolution | null => {
  const [resolution, setResolution] = useState<Resolution | null>(null);

  useEffect(() => {
    if (actualPost.mediaType === `Video`) {
      setResolution({ height: 620, width: 348 });
      return;
    }

    const run = async (): Promise<void> => {
      try {
        const image = await createImage(actualPost.mediaUrl);
        setResolution({ height: image.height, width: image.width });
      } catch (err) {
        setResolution({ height: 620, width: 348 });
      }
    };
    run();
  }, [actualPost.mediaType, actualPost.mediaUrl]);

  return resolution;
};
