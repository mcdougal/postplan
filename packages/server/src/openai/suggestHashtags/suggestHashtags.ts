import { ForbiddenError } from '@/server/auth';

import { sendOpenAiRequest } from '../utils';

type Args = {
  auth: {
    currentUserId: string;
  };
  where: {
    caption: string;
  };
};

export default async (args: Args): Promise<Array<string>> => {
  const { currentUserId } = args.auth;
  const { caption } = args.where;

  if (!currentUserId) {
    throw new ForbiddenError();
  }

  const result = await sendOpenAiRequest(
    `Suggest 30 hashtags for the following Instagram caption. Separate hashtags with commas. Do not repeat existing hashtags.\n\n${caption}`
  );

  return result
    ? result.split(`,`).map((hashtag) => {
        return hashtag.trim();
      })
    : [];
};
