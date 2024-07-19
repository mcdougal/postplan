import axios from 'axios';
import { z } from 'zod';

type Args = {
  data: { longLivedAccessToken: string };
};

const InstagramRefreshAccessTokenResponseSchema = z.object({
  access_token: z.string(),
  expires_in: z.number(),
  token_type: z.string(),
});

type Response = {
  accessToken: string;
  expiresAt: Date;
  tokenType: string;
};

export default async (args: Args): Promise<Response> => {
  const { longLivedAccessToken } = args.data;
  const responseStart = new Date();

  const response = await axios.get<unknown>(
    `https://graph.instagram.com/refresh_access_token?${[
      `access_token=${longLivedAccessToken}`,
      `grant_type=ig_refresh_token`,
    ].join(`&`)}`
  );

  const responseParsed = InstagramRefreshAccessTokenResponseSchema.parse(
    response.data
  );

  const expiresAt = new Date(
    responseStart.getTime() + responseParsed.expires_in * 1000
  );

  return {
    accessToken: responseParsed.access_token,
    expiresAt,
    tokenType: responseParsed.token_type,
  };
};
