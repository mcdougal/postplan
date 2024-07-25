/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @postplan/no-type-assertion */
/* eslint-disable no-console */

import { addJobToQueue } from '@/server/jobsQueue';

const run = async (jobName: string): Promise<void> => {
  await addJobToQueue({
    name: jobName as any,
    data: {},
  });
};

if (module === require.main) {
  const jobName = process.argv[2];

  if (!jobName) {
    console.error(`Please provide a job name`);
    process.exit(1);
  }

  run(jobName).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
