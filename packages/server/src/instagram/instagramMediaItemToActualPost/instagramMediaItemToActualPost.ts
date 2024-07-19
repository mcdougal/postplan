import { ActualPost, InstagramMediaItem } from '../types';

export default (instagramMediaItem: InstagramMediaItem): ActualPost => {
  const mediaTypeMap: {
    [key in InstagramMediaItem['mediaType']]: ActualPost['mediaType'];
  } = {
    CAROUSEL_ALBUM: `CarouselAlbum`,
    IMAGE: `Image`,
    VIDEO: `Video`,
  };

  return {
    caption: instagramMediaItem.caption || null,
    instagramId: instagramMediaItem.id,
    mediaThumbnailUrl: null,
    mediaType: mediaTypeMap[instagramMediaItem.mediaType],
    mediaUrl: instagramMediaItem.thumbnailUrl || instagramMediaItem.mediaUrl,
    permalink: instagramMediaItem.permalink,
    postedAt: new Date(instagramMediaItem.timestamp),
  };
};
