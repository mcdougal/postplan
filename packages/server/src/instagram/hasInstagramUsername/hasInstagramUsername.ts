import { ForbiddenError } from '@/server/auth';

import queryInstagramUsername from '../queryInstagramUsername';

type Args = {
  auth: { currentUserId: string };
  where: { userId: string };
};

export default async (args: Args): Promise<boolean> => {
  const { currentUserId } = args.auth;
  const { userId } = args.where;

  if (currentUserId !== userId) {
    throw new ForbiddenError();
  }

  const instagramUsername = await queryInstagramUsername({
    auth: { currentUserId },
    where: { userId },
  });

  return Boolean(instagramUsername);
};
