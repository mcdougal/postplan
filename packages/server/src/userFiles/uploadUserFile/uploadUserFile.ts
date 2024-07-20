import { ForbiddenError } from '@/server/auth';
import { uploadFile } from '@/server/storage';

type Args = {
  auth: {
    currentUserId: string;
  };
  data: {
    file: Blob | Buffer | File;
    fileName: string;
    userId: string;
  };
};

export default async (args: Args): Promise<void> => {
  const { currentUserId } = args.auth;
  const { file, fileName, userId } = args.data;

  if (userId !== currentUserId) {
    throw new ForbiddenError();
  }

  await uploadFile(`users/${userId}/${fileName}`, file);
};
