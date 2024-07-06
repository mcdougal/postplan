import { ForbiddenError } from '@/server/auth';
import { generateFileUploadPresignedUrl } from '@/server/storage';

type Args = {
  auth: {
    currentUserId: string;
  };
  data: {
    fileName: string;
    userId: string;
  };
};

export default async (args: Args): Promise<string> => {
  const { currentUserId } = args.auth;
  const { fileName, userId } = args.data;

  if (userId !== currentUserId) {
    throw new ForbiddenError();
  }

  return generateFileUploadPresignedUrl(`users/${userId}/${fileName}`);
};
