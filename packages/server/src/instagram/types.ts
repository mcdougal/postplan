import { QueryResult } from '@/db/types';

export type InstagramMediaItem = {
  caption?: string;
  height?: number;
  id: string;
  mediaType: `CAROUSEL_ALBUM` | `IMAGE` | `VIDEO`;
  mediaUrl: string;
  permalink: string;
  thumbnailUrl?: string;
  timestamp: string;
  width?: number;
};

export type ActualPost = QueryResult<
  'actualPost',
  {
    caption: true;
    height: true;
    instagramId: true;
    mediaThumbnailUrl: true;
    mediaType: true;
    mediaUrl: true;
    permalink: true;
    postedAt: true;
    width: true;
  }
>;
