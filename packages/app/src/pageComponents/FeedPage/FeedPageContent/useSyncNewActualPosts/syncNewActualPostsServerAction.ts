'use server';

import { addJobToQueue } from '@/server/jobsQueue';

import { authenticatedServerAction } from '@/app/serverActions';

type Args = {
  data: {
    userId: string;
  };
};

export default authenticatedServerAction<Args>({
  errorMessage: `Error syncing Instagram posts`,
  serverAction: async (args, currentUser) => {
    const { userId } = args.data;

    if (userId !== currentUser.id) {
      return { status: `error`, message: `Not authorized` };
    }

    await addJobToQueue({
      name: `syncInstagramFromRapidApi`,
      data: { userId },
    });

    return { status: `success` };
  },
});
