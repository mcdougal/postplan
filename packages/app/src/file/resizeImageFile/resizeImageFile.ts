import { createImage, scaleImage } from '@/app/image';

import readFileAsDataUrl from '../readFileAsDataUrl';

export default async (
  imageFile: File,
  { fileName, maxSize }: { fileName: string; maxSize: number }
): Promise<File> => {
  const dataUrl = await readFileAsDataUrl(imageFile);
  const image = await createImage(dataUrl);
  const scaledImageDataUrl = await scaleImage(image, { maxSize });

  return new File([scaledImageDataUrl], fileName, { type: `image/jpeg` });
};
