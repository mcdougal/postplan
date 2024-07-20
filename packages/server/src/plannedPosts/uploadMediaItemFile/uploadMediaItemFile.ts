import axios from 'axios';

import { ForbiddenError } from '@/server/auth';
import { generateFileUploadUrl } from '@/server/userFiles';

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

  const fileArrayBuffer = await file.arrayBuffer();

  const fileUploadUrl = await generateFileUploadUrl({
    auth: { currentUserId: userId },
    data: { fileName, userId },
  });

  await axios.put(fileUploadUrl, fileArrayBuffer, {
    headers: {
      'Access-Control-Allow-Origin': `*`,
      'Content-Type': `image/jpeg`,
    },
  });
};
