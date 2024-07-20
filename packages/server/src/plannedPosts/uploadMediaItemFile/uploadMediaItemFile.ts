import { ForbiddenError } from '@/server/auth';
import { uploadUserFile } from '@/server/userFiles';

type Args = {
  auth: {
    currentUserId: string;
  };
  data: {
    file: File;
    fileName: string;
    userId: string;
  };
};

export default async (args: Args): Promise<void> => {
  const { currentUserId } = args.auth;
  const { file, fileName, userId } = args.data;

  if (currentUserId !== userId) {
    throw new ForbiddenError();
  }

  await uploadUserFile({
    auth: { currentUserId },
    data: { file, fileName, userId },
  });
};
