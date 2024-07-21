import { getRequiredEnvVar } from '@/common/env';
import axios from 'axios';
import { z } from 'zod';

type Args = {
  data: { shortLivedAccessToken: string };
};

const InstagramAccessTokenResponseSchema = z.object({
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
  const { shortLivedAccessToken } = args.data;
  const responseStart = new Date();

  try {
    const response = await axios.get<unknown>(
      `https://graph.instagram.com/access_token?${[
        `access_token=${shortLivedAccessToken}`,
        `client_secret=${getRequiredEnvVar(`INSTAGRAM_APP_SECRET`)}`,
        `grant_type=ig_exchange_token`,
      ].join(`&`)}`
    );

    const responseParsed = InstagramAccessTokenResponseSchema.parse(
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
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data);
    }
    throw err;
  }
};
