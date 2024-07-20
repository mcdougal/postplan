import { Job } from '@/common/jobs';
import { db } from '@/db/connection';

import { runJobs } from '@/server/jobsRunner';

export default async (): Promise<void> => {
  const allUsers = await db.query.user.findMany({
    columns: {
      id: true,
    },
  });

  const jobs: Array<Job> = allUsers.map((user) => {
    return {
      name: `refreshActualPostMediaUrlsOneUser`,
      data: {
        userId: user.id,
      },
    };
  });

  await runJobs(jobs);
};
