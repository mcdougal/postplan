import axios from 'axios';
import ms from 'ms';
import { z } from 'zod';

import { ForbiddenError } from '@/server/auth';

import queryInstagramUsername from '../queryInstagramUsername';
import { InstagramMediaItem } from '../types';

type Args = {
  auth: {
    currentUserId: string;
  };
  where: {
    userId: string;
  };
};

const INSTAGRAM_APP_ID = `936619743392459`;

const InstagramWebProfileInfoMediaNodeSchema = z.object({
  __typename: z.enum([`GraphImage`, `GraphVideo`, `GraphSidecar`]),
  dimensions: z.object({
    height: z.number(),
    width: z.number(),
  }),
  display_url: z.string(),
  edge_media_to_caption: z.object({
    edges: z.array(
      z.object({
        node: z.object({
          text: z.string(),
        }),
      })
    ),
  }),
  id: z.string(),
  shortcode: z.string(),
  taken_at_timestamp: z.number(),
});

const InstagramWebProfileInfoResponseSchema = z.object({
  data: z.object({
    user: z.object({
      edge_owner_to_timeline_media: z.object({
        edges: z.array(
          z.object({
            node: InstagramWebProfileInfoMediaNodeSchema,
          })
        ),
      }),
      is_private: z.boolean(),
    }),
  }),
});

export default async (args: Args): Promise<Array<InstagramMediaItem>> => {
  const { currentUserId } = args.auth;
  const { userId } = args.where;

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

  const profileUrl = `https://www.instagram.com/${instagramUsername}/`;
  const profileInfoUrl = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(
    instagramUsername
  )}`;

  const profileInfoResponse = await axios.get<unknown>(profileInfoUrl, {
    headers: {
      accept: `application/json`,
      referer: profileUrl,
      'user-agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36`,
      'x-ig-app-id': INSTAGRAM_APP_ID,
    },
    timeout: ms(`30000`),
  });

  const profileInfoResponseParsed = InstagramWebProfileInfoResponseSchema.parse(
    profileInfoResponse.data
  );

  if (profileInfoResponseParsed.data.user.is_private) {
    throw new Error(`Instagram profile is private`);
  }

  const mediaTypeMap: {
    [key in z.infer<
      typeof InstagramWebProfileInfoMediaNodeSchema
    >['__typename']]: InstagramMediaItem['mediaType'];
  } = {
    GraphImage: `IMAGE`,
    GraphSidecar: `CAROUSEL_ALBUM`,
    GraphVideo: `VIDEO`,
  };

  const mediaEdges =
    profileInfoResponseParsed.data.user.edge_owner_to_timeline_media.edges;

  return mediaEdges.map(({ node }) => {
    return {
      caption: node.edge_media_to_caption.edges[0]?.node.text,
      height: node.dimensions.height,
      id: node.id,
      mediaType: mediaTypeMap[node.__typename],
      mediaUrl: node.display_url,
      permalink: `https://www.instagram.com/p/${node.shortcode}/`,
      timestamp: new Date(node.taken_at_timestamp * 1000).toISOString(),
      width: node.dimensions.width,
    };
  });
};
