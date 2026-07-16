import { getRequiredEnvVar } from '@/common/env';
import { InstagramOAuthRoute } from '@/common/routes';
import axios from 'axios';
import { z } from 'zod';

type Args = {
  data: { code: string };
};

const InstagramAccessTokenFieldsSchema = z
  .object({
    access_token: z.string(),
    permissions: z.union([z.array(z.string()), z.string()]),
    user_id: z.union([z.number(), z.string()]),
  })
  .transform((response) => {
    return {
      accessToken: response.access_token,
      permissions: Array.isArray(response.permissions)
        ? response.permissions
        : response.permissions.split(`,`).map((permission) => {
            return permission.trim();
          }),
      userId: `${response.user_id}`,
    };
  });

const InstagramAccessTokenResponseSchema = z.union([
  InstagramAccessTokenFieldsSchema,
  z
    .object({
      data: z.array(InstagramAccessTokenFieldsSchema).min(1),
    })
    .transform((response) => {
      return response.data[0];
    }),
]);

type Response = {
  accessToken: string;
  permissions: Array<string>;
  userId: string;
};

export default async (args: Args): Promise<Response> => {
  const { code } = args.data;

  const searchParams = new URLSearchParams({
    client_id: getRequiredEnvVar(`INSTAGRAM_APP_ID`),
    client_secret: getRequiredEnvVar(`INSTAGRAM_APP_SECRET`),
    code,
    grant_type: `authorization_code`,
    redirect_uri: InstagramOAuthRoute.getAbsoluteUrl(),
  });

  const response = await axios.post<unknown>(
    `https://api.instagram.com/oauth/access_token`,
    searchParams,
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
    accessToken: responseParsed.accessToken,
    permissions: responseParsed.permissions,
    userId: responseParsed.userId,
  };
};
