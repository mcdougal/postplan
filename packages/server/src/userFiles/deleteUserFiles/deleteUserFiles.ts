import { ForbiddenError } from '@/server/auth';
import { deleteFiles } from '@/server/storage';

type Args = {
  auth: {
    currentUserId: string;
  };
  data: {
    files: Array<{
      fileName: string;
      userId: string;
    }>;
  };
};

export default async (args: Args): Promise<void> => {
  const { currentUserId } = args.auth;
  const { files } = args.data;

  const notAuthorized = files.some((file) => {
    return file.userId !== currentUserId;
  });

  if (notAuthorized) {
    throw new ForbiddenError();
  }

  const fileKeys = files.map((file) => {
    return `users/${file.userId}/${file.fileName}`;
  });

  await deleteFiles(fileKeys);
};
