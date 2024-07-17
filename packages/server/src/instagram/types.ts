export type InstagramMediaItem = {
  id: string;
  caption?: string;
  mediaType: `CAROUSEL_ALBUM` | `IMAGE` | `VIDEO`;
  mediaUrl: string;
  permalink?: string;
  thumbnailUrl?: string;
  timestamp: string;
};
