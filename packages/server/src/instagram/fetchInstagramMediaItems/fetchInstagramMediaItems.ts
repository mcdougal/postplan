import { getRequiredEnvVar } from '@/common/env';
import axios from 'axios';
import { z } from 'zod';

import { InstagramMediaItem } from '../types';

const DEANNA_TROY_TRAVELS_USER_ID = `17841402384050982`;

const InstagramApiMediaItemSchema = z.object({
  caption: z.string().optional(),
  id: z.string(),
  media_type: z.enum([`CAROUSEL_ALBUM`, `IMAGE`, `VIDEO`]),
  media_url: z.string(),
  permalink: z.string().optional(),
  thumbnail_url: z.string().optional(),
  timestamp: z.string(),
});

const InstagramApiMediaResponseSchema = z.object({
  data: z.array(InstagramApiMediaItemSchema),
});

export default async (options: {
  limit: number;
}): Promise<Array<InstagramMediaItem>> => {
  const instagramAccessToken = getRequiredEnvVar(`INSTAGRAM_ACCESS_TOKEN`);

  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

  const mediaUrl = `https://graph.instagram.com/v14.0/${DEANNA_TROY_TRAVELS_USER_ID}/media?${[
    `access_token=${instagramAccessToken}`,
    `fields=caption,id,media_type,media_url,permalink,thumbnail_url,timestamp`,
    `limit=${options.limit}`,
  ].join(`&`)}`;

  const mediaResponse = await axios.get<unknown>(mediaUrl);

  const mediaResponseParsed = InstagramApiMediaResponseSchema.parse(
    mediaResponse.data
  );

  return mediaResponseParsed.data.map((mediaItem) => {
    return {
      caption: mediaItem.caption,
      id: mediaItem.id,
      mediaType: mediaItem.media_type,
      mediaUrl: mediaItem.media_url,
      permalink: mediaItem.permalink,
      thumbnailUrl: mediaItem.thumbnail_url,
      timestamp: mediaItem.timestamp,
    };
  });
};
