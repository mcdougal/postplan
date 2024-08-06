import { getRequiredEnvVar } from '@/common/env';
import axios from 'axios';
import { z } from 'zod';

import { ForbiddenError } from '@/server/auth';

import { InstagramMediaItem } from '../types';

type Args = {
  auth: { currentUserId: string };
  where: { userId: string };
  limit: number;
};

const InstagramApiMediaItemSchema = z.object({
  caption: z.object({ text: z.string() }).optional(),
  code: z.string(),
  display_uri_original: z.string(),
  media_type: z.union([z.literal(1), z.literal(2), z.literal(8)]),
  pk: z.string(),
  taken_at: z.number(),
});

// const InstagramApiMediaItemSchema = z.object({
//   caption: z.object({ text: z.string() }).optional(),
//   code: z.string(),
//   id: z.string(),
//   media_name: z.enum([`album`, `post`, `reel`]),
//   taken_at_ts: z.number(),
//   thumbnail_url: z.string(),
// });

type InstagramApiMediaItem = z.infer<typeof InstagramApiMediaItemSchema>;

const InstagramApiMediaResponseSchema = z.object({
  items: z.array(InstagramApiMediaItemSchema),
});

export default async (args: Args): Promise<Array<InstagramMediaItem>> => {
  const { currentUserId } = args.auth;
  const { userId } = args.where;
  const { limit } = args;

  if (currentUserId !== userId) {
    throw new ForbiddenError();
  }

  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

  const mediaUrl = `https://instagram-bulk-profile-scrapper.p.rapidapi.com/clients/api/ig/feeds?${[
    `ig=deanna_troy_travels`,
    `corsEnabled=true`,
  ].join(`&`)}`;

  const mediaResponse = await axios.get<unknown>(mediaUrl, {
    headers: {
      'x-rapidapi-host': `instagram-bulk-profile-scrapper.p.rapidapi.com`,
      'x-rapidapi-key': getRequiredEnvVar(`RAPID_API_KEY`),
      ig: `fairytalefolkdorset`,
    },
  });

  const mediaResponseParsed = InstagramApiMediaResponseSchema.parse(
    mediaResponse.data
  );

  return mediaResponseParsed.items.map((mediaItem) => {
    const mediaTypeMap: {
      [key in InstagramApiMediaItem['media_type']]: InstagramMediaItem['mediaType'];
    } = {
      8: `CAROUSEL_ALBUM`,
      1: `IMAGE`,
      2: `VIDEO`,
    };

    const permalinkUrlPartMap: {
      [key in InstagramMediaItem['mediaType']]: string;
    } = {
      CAROUSEL_ALBUM: `p`,
      IMAGE: `p`,
      VIDEO: `reel`,
    };

    const mediaType = mediaTypeMap[mediaItem.media_type];

    return {
      caption: mediaItem.caption?.text,
      id: mediaItem.pk,
      mediaType,
      mediaUrl: mediaItem.display_uri_original,
      permalink: `https://www.instagram.com/${permalinkUrlPartMap[mediaType]}/${mediaItem.code}/`,
      thumbnailUrl: mediaItem.display_uri_original,
      timestamp: new Date(mediaItem.taken_at * 1000).toISOString(),
    };
  });

  // const mediaUrl = `https://instagram-scraper-api2.p.rapidapi.com/v1.2/posts?${[
  //   `username_or_id_or_url=deanna_troy_travels`,
  // ].join(`&`)}`;

  // const mediaResponse = await axios.get<unknown>(mediaUrl, {
  //   headers: {
  //     'x-rapidapi-host': `instagram-scraper-api2.p.rapidapi.com`,
  //     'x-rapidapi-key': getRequiredEnvVar(`RAPID_API_KEY`),
  //   },
  // });

  // const mediaResponseParsed = InstagramApiMediaResponseSchema.parse(
  //   mediaResponse.data
  // );

  // return mediaResponseParsed.data.items.map((mediaItem) => {
  //   const mediaTypeMap: {
  //     [key in InstagramApiMediaItem['media_name']]: InstagramMediaItem['mediaType'];
  //   } = {
  //     album: `CAROUSEL_ALBUM`,
  //     post: `IMAGE`,
  //     reel: `VIDEO`,
  //   };

  //   const permalinkUrlPartMap: {
  //     [key in InstagramApiMediaItem['media_name']]: string;
  //   } = {
  //     album: `p`,
  //     post: `p`,
  //     reel: `reel`,
  //   };

  //   return {
  //     caption: mediaItem.caption?.text,
  //     id: mediaItem.id,
  //     mediaType: mediaTypeMap[mediaItem.media_name],
  //     mediaUrl: mediaItem.thumbnail_url,
  //     permalink: `https://www.instagram.com/${permalinkUrlPartMap[mediaItem.media_name]}/${mediaItem.code}/`,
  //     thumbnailUrl: mediaItem.thumbnail_url,
  //     timestamp: new Date(mediaItem.taken_at_ts * 1000).toISOString(),
  //   };
  // });
};
