import { getRequiredEnvVar } from '@/common/env';
import axios, { AxiosError } from 'axios';
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
    // eslint-disable-next-line @postplan/no-type-assertion, @typescript-eslint/no-explicit-any, no-console
    console.log(JSON.stringify((err as any)?.response?.data));
    throw err;
  }
};
