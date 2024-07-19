import axios from 'axios';
import { z } from 'zod';

import { ForbiddenError } from '@/server/auth';

import queryActiveConnection from '../queryActiveConnection';
import { InstagramMediaItem } from '../types';

type Args = {
  auth: { currentUserId: string };
  where: { userId: string };
  limit: number;
};

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

export default async (args: Args): Promise<Array<InstagramMediaItem>> => {
  const { currentUserId } = args.auth;
  const { userId } = args.where;
  const { limit } = args;

  if (currentUserId !== userId) {
    throw new ForbiddenError();
  }

  const connection = await queryActiveConnection({
    auth: { currentUserId },
    where: { userId },
  });

  if (!connection) {
    throw new ForbiddenError();
  }

  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

  const mediaUrl = `https://graph.instagram.com/me/media?${[
    `access_token=${connection.accessToken}`,
    `fields=caption,id,media_type,media_url,permalink,thumbnail_url,timestamp`,
    `limit=${limit}`,
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
