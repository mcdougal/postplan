import { ForbiddenError } from '@/server/auth';
import { generateFileDownloadPresignedUrl } from '@/server/storage';

type Args = {
  auth: {
    currentUserId: string;
  };
  where: {
    fileName: string;
    userId: string;
  };
};

export default async (args: Args): Promise<string> => {
  const { currentUserId } = args.auth;
  const { fileName, userId } = args.where;

  if (userId !== currentUserId) {
    throw new ForbiddenError();
  }

  return generateFileDownloadPresignedUrl(`users/${userId}/${fileName}`);
};
