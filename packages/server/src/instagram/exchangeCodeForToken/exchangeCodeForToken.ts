import { getRequiredEnvVar } from '@/common/env';
import { InstagramOAuthRoute } from '@/common/routes';
import axios from 'axios';
import { z } from 'zod';

type Args = {
  data: { code: string };
};

const InstagramAccessTokenResponseSchema = z.object({
  access_token: z.string(),
  permissions: z.array(z.string()),
  user_id: z.number(),
});

type Response = {
  accessToken: string;
  permissions: Array<string>;
  userId: string;
};

export default async (args: Args): Promise<Response> => {
  const { code } = args.data;

  const response = await axios.post<unknown>(
    `https://api.instagram.com/oauth/access_token`,
    {
      client_id: getRequiredEnvVar(`INSTAGRAM_APP_ID`),
      client_secret: getRequiredEnvVar(`INSTAGRAM_APP_SECRET`),
      code,
      grant_type: `authorization_code`,
      redirect_uri: InstagramOAuthRoute.getAbsoluteUrl(),
    },
    {
      headers: {
        'Content-Type': `application/x-www-form-urlencoded`,
      },
    }
  );

  const responseParsed = InstagramAccessTokenResponseSchema.parse(
    response.data
  );

  return {
    accessToken: responseParsed.access_token,
    permissions: responseParsed.permissions,
    userId: `${responseParsed.user_id}`,
  };
};
