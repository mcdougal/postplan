/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @postplan/no-type-assertion */
/* eslint-disable no-console */

import { addJobToQueue } from '@/server/jobsQueue';

const run = async (jobName: string, jobData: unknown): Promise<void> => {
  await addJobToQueue({
    name: jobName as any,
    data: jobData as any,
  });
};

if (module === require.main) {
  const jobName = process.argv[2];
  const jobDataString = process.argv[3];

  if (!jobName) {
    console.error(`Please provide a job name`);
    process.exit(1);
  }

  if (!jobDataString) {
    console.error(`Please provide job data`);
    process.exit(1);
  }

  let jobData: unknown;

  try {
    jobData = JSON.parse(jobDataString);
  } catch (error) {
    console.error(`Failed to parse job data: ${error}`);
    process.exit(1);
  }

  run(jobName, jobData).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
