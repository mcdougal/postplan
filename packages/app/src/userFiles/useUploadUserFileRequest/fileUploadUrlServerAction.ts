'use server';

import { generateFileUploadUrl } from '@/server/userFiles';

import { authenticatedServerAction } from '@/app/serverActions';

type Args = {
  data: {
    fileName: string;
    userId: string;
  };
};

type ResponseData = { fileUploadUrl: string };

export default authenticatedServerAction<Args, ResponseData>({
  errorMessage: `Error uploading file`,
  serverAction: async (args, currentUser) => {
    const { fileName, userId } = args.data;

    const fileUploadUrl = await generateFileUploadUrl({
      auth: {
        currentUserId: currentUser.id,
      },
      data: {
        fileName,
        userId,
      },
    });

    return { status: `success`, data: { fileUploadUrl } };
  },
});
