import { ForbiddenError } from '@/server/auth';
import { listFileNames } from '@/server/storage';

type Args = {
  auth: {
    currentUserId: string;
  };
  data: {
    userId: string;
  };
};

export default async (args: Args): Promise<Array<string>> => {
  const { currentUserId } = args.auth;
  const { userId } = args.data;

  const notAuthorized = userId !== currentUserId;

  if (notAuthorized) {
    throw new ForbiddenError();
  }

  return listFileNames(`users/${userId}`);
};
