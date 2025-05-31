'use server';

import { addJobToQueue } from '@/server/jobsQueue';

import { authenticatedServerAction } from '@/app/serverActions';

type Args = {
  where: {
    userId: string;
  };
  options: {
    force: boolean;
  };
};

export default authenticatedServerAction<Args>({
  errorMessage: `Error syncing Instagram posts`,
  serverAction: async (args, currentUser) => {
    const { userId } = args.where;
    const { force } = args.options;

    if (userId !== currentUser.id) {
      return { status: `error`, message: `Not authorized` };
    }

    if (force) {
      await addJobToQueue({
        name: `recreateActualPosts`,
        data: { userId },
      });
    } else {
      await addJobToQueue({
        name: `syncInstagramFromRapidApi`,
        data: { force, userId },
      });
    }

    return { status: `success` };
  },
});
