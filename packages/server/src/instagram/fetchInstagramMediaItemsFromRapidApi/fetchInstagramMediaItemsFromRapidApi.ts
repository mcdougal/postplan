import { getRequiredEnvVar } from '@/common/env';
import axios from 'axios';
import { z } from 'zod';

import { ForbiddenError } from '@/server/auth';

import queryInstagramUsername from '../queryInstagramUsername';
import { InstagramMediaItem } from '../types';

type Args = {
  auth: {
    currentUserId: string;
  };
  where: {
    cursor: string | undefined;
    userId: string;
  };
};

const InstagramApiMediaItemSchema = z.object({
  caption: z.object({ text: z.string() }).optional(),
  code: z.string(),
  // todo - use different image candidate for reels
  display_uri_original: z.string(),
  media_type: z.union([z.literal(1), z.literal(2), z.literal(8)]),
  pk: z.string(),
  taken_at: z.number(),
});

type InstagramApiMediaItem = z.infer<typeof InstagramApiMediaItemSchema>;

const InstagramApiMediaResponseSchema = z.object({
  items: z.array(InstagramApiMediaItemSchema),
  next_max_id: z.string().nullable().optional(),
});

export default async (
  args: Args
): Promise<{
  cursor: string | null;
  instagramMediaItems: Array<InstagramMediaItem>;
}> => {
  const { currentUserId } = args.auth;
  const { cursor, userId } = args.where;

  if (currentUserId !== userId) {
    throw new ForbiddenError();
  }

  const instagramUsername = await queryInstagramUsername({
    auth: { currentUserId },
    where: { userId },
  });

  if (!instagramUsername) {
    throw new Error(`User does not have an Instagram username set`);
  }

  const mediaUrl = `https://instagram-bulk-profile-scrapper.p.rapidapi.com/clients/api/ig/feeds?${[
    `ig=${instagramUsername}`,
    `corsEnabled=true`,
    cursor ? `nextMaxId=${cursor}` : null,
  ]
    .filter(Boolean)
    .join(`&`)}`;

  const mediaResponse = await axios.get<unknown>(mediaUrl, {
    headers: {
      'x-rapidapi-host': `instagram-bulk-profile-scrapper.p.rapidapi.com`,
      'x-rapidapi-key': getRequiredEnvVar(`RAPID_API_KEY`),
      ig: `fairytalefolkdorset`,
    },
  });

  // todo
  console.log(
    `media response:`,
    mediaResponse.status,
    mediaResponse.statusText
  );
  // eslint-disable-next-line @postplan/no-type-assertion, @typescript-eslint/no-explicit-any
  if (!(mediaResponse.data as any)?.items) {
    console.log(JSON.stringify(mediaResponse.data, null, 2));
  }

  const mediaResponseParsed = InstagramApiMediaResponseSchema.parse(
    mediaResponse.data
  );

  const instagramMediaItems = mediaResponseParsed.items.map((mediaItem) => {
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

  return {
    cursor: mediaResponseParsed.next_max_id || null,
    instagramMediaItems,
  };
};
