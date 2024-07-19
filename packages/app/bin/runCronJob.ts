/* eslint-disable no-console */
import { getRequiredEnvVar } from '@/common/env';
import { CronRoute } from '@/common/routes';

const CRON_SECRET = getRequiredEnvVar(`CRON_SECRET`);

const run = async (jobName: string): Promise<void> => {
  const cronUrl = CronRoute.getAbsoluteUrl({ params: { jobName } });

  console.log(`Starting job: ${cronUrl} (see server logs for output)`);

  const result = await fetch(cronUrl, {
    method: `GET`,
    headers: {
      Authorization: `Bearer ${CRON_SECRET}`,
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

  if (!jobName) {
    console.error(`Please provide a job name`);
    process.exit(1);
  }

  run(jobName).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
