/* eslint-disable no-console */
import { getRequiredEnvVar } from '@/common/env';
import { JobRoute } from '@/common/routes';

const JOB_SECRET = getRequiredEnvVar(`JOB_SECRET`);

const run = async (
  jobName: string,
  data: string | undefined
): Promise<void> => {
  const jobUrl = JobRoute.getAbsoluteUrl({
    params: { jobName },
    searchParams: { data: data ? JSON.parse(data) : undefined },
  });

  console.log(`Starting job: ${jobUrl} (see server logs for output)`);

  const result = await fetch(jobUrl, {
    method: `GET`,
    headers: {
      Authorization: `Bearer ${JOB_SECRET}`,
      'Content-Type': `application/json`,
    },
  });

  if (result.ok) {
    console.log(`Job started`);
  } else {
    console.error(`Job failed to start: ${result.status} ${result.statusText}`);
  }
};

if (module === require.main) {
  const jobName = process.argv[2];
  const data = process.argv.length > 3 ? process.argv[3] : undefined;

  if (!jobName) {
    console.error(`Please provide a job name`);
    process.exit(1);
  }

  run(jobName, data).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
