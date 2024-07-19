'use server';

import { suggestHashtags } from '@/server/openai';

import { authenticatedServerAction } from '@/app/serverActions';

type Args = {
  data: {
    caption: string;
  };
};

type ResponseData = { suggestedHashtags: Array<string> };

export default authenticatedServerAction<Args, ResponseData>({
  errorMessage: `Error suggesting hashtags`,
  serverAction: async (args, currentUser) => {
    const { caption } = args.data;

    const suggestedHashtags = await suggestHashtags({
      auth: { currentUserId: currentUser.id },
      where: { caption },
    });

    return { status: `success`, data: { suggestedHashtags } };
  },
});
