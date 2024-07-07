export default async (
  image: HTMLImageElement,
  mimeType: string,
  { maxSize }: { maxSize: number }
): Promise<string> => {
  const canvas = document.createElement(`canvas`);
  const context = canvas.getContext(`2d`);

  if (!context) {
    throw new Error(`Could not get canvas context`);
  }

  let width = image.width;
  let height = image.height;

  if (width > height) {
    if (width > maxSize) {
      height *= maxSize / width;
      width = maxSize;
    }
  } else {
    if (height > maxSize) {
      width *= maxSize / height;
      height = maxSize;
    }
  }

  canvas.width = width;
  canvas.height = height;
  context.drawImage(image, 0, 0, width, height);

  return canvas.toDataURL(mimeType);
};
