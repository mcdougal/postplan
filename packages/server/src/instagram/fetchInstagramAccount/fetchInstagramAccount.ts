import axios from 'axios';
import { z } from 'zod';

type Args = {
  data: { accessToken: string };
};

const InstagramAccountFieldsSchema = z.object({
  account_type: z.string(),
  id: z.string(),
  user_id: z.string(),
  username: z.string(),
});

const InstagramAccountResponseSchema = z.union([
  InstagramAccountFieldsSchema,
  z
    .object({
      data: z.array(InstagramAccountFieldsSchema).min(1),
    })
    .transform((response) => {
      return response.data[0];
    }),
]);

type Response = {
  accountType: string;
  id: string;
  userId: string;
  username: string;
};

export default async (args: Args): Promise<Response> => {
  const { accessToken } = args.data;

  const searchParams = new URLSearchParams({
    access_token: accessToken,
    fields: `id,user_id,username,account_type`,
  });

  const response = await axios.get<unknown>(
    `https://graph.instagram.com/v25.0/me?${searchParams.toString()}`
  );

  const responseParsed = InstagramAccountResponseSchema.parse(response.data);

  return {
    accountType: responseParsed.account_type,
    id: responseParsed.id,
    userId: responseParsed.user_id,
    username: responseParsed.username,
  };
};
