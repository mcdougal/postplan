import { getRequiredEnvVar } from '@/common/env';
import axios from 'axios';
import ms from 'ms';

import { ForbiddenError } from '@/server/auth';

import queryInstagramUsername from '../queryInstagramUsername';
import { InstagramMediaItem } from '../types';

import findHighestResolutionImage from './findHighestResolutionImage';
import {
  InstagramApiMediaItem,
  InstagramApiMediaResponseSchema,
} from './types';

type Args = {
  auth: {
    currentUserId: string;
  };
  where: {
    cursor: string | undefined;
    userId: string;
  };
};

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
    timeout: ms(`5000`),
  });

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

    const highestResolutionImage = findHighestResolutionImage(mediaItem);

    return {
      caption: mediaItem.caption?.text,
      height: highestResolutionImage.height,
      id: mediaItem.pk,
      mediaType,
      mediaUrl: highestResolutionImage.url,
      permalink: `https://www.instagram.com/${permalinkUrlPartMap[mediaType]}/${mediaItem.code}/`,
      thumbnailUrl: highestResolutionImage.url,
      timestamp: new Date(mediaItem.taken_at * 1000).toISOString(),
      width: highestResolutionImage.width,
    };
  });

  return {
    cursor: mediaResponseParsed.next_max_id || null,
    instagramMediaItems,
  };
};
