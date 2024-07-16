import { createImage } from '@/app/image';

import readFileAsDataUrl from '../readFileAsDataUrl';

export default async (
  imageFile: File
): Promise<{ height: number; width: number }> => {
  const dataUrl = await readFileAsDataUrl(imageFile);
  const image = await createImage(dataUrl);

  return {
    height: image.height,
    width: image.width,
  };
};
