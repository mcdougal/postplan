import { InstagramApiMediaItem } from './types';

type InstagramApiMediaItemImage = {
  height: number;
  url: string;
  width: number;
};

export default (
  instagramApiMediaItem: InstagramApiMediaItem
): InstagramApiMediaItemImage => {
  let currentImage: InstagramApiMediaItemImage | null = null;

  instagramApiMediaItem.image_versions2.candidates.forEach((image) => {
    if (
      instagramApiMediaItem.media_type === 2 &&
      image.width === image.height
    ) {
      return;
    }

    if (image.width > 1400 && image.height > 1400) {
      return;
    }

    if (
      !currentImage ||
      image.width > currentImage.width ||
      image.height > currentImage.height
    ) {
      currentImage = {
        height: image.height,
        url: image.url_original,
        width: image.width,
      };
    }
  });

  if (!currentImage) {
    instagramApiMediaItem.image_versions2.candidates.forEach((image) => {
      if (
        !currentImage ||
        image.width > currentImage.width ||
        image.height > currentImage.height
      ) {
        currentImage = {
          height: image.height,
          url: image.url_original,
          width: image.width,
        };
      }
    });
  }

  return (
    currentImage || {
      height: instagramApiMediaItem.original_height,
      url: instagramApiMediaItem.display_uri_original,
      width: instagramApiMediaItem.original_width,
    }
  );
};
