import { QueryResult } from '@/db/types';

export type InstagramMediaItem = {
  caption?: string;
  id: string;
  mediaType: `CAROUSEL_ALBUM` | `IMAGE` | `VIDEO`;
  mediaUrl: string;
  permalink: string;
  thumbnailUrl?: string;
  timestamp: string;
};

export type ActualPost = QueryResult<
  'actualPost',
  {
    caption: true;
    instagramId: true;
    mediaThumbnailUrl: true;
    mediaType: true;
    mediaUrl: true;
    permalink: true;
    postedAt: true;
  }
>;
