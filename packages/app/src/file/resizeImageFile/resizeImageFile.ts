import { createImage, scaleImage } from '@/app/image';

import dataUrlToFile from '../dataUrlToFile';
import getDataUrlMimeType from '../getDataUrlMimeType';
import readFileAsDataUrl from '../readFileAsDataUrl';

export default async (
  imageFile: File,
  { fileName, maxSize }: { fileName: string; maxSize: number }
): Promise<File> => {
  const dataUrl = await readFileAsDataUrl(imageFile);
  const image = await createImage(dataUrl);
  const scaledImageDataUrl = await scaleImage(
    image,
    getDataUrlMimeType(dataUrl),
    { maxSize }
  );

  return dataUrlToFile(scaledImageDataUrl, fileName);
};
