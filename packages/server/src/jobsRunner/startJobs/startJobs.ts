import { getRequiredEnvVar } from '@/common/env';
import { Job } from '@/common/jobs';
import { JobRoute } from '@/common/routes';
import { sleep } from '@/common/sleep';

export default async <J extends Job>(jobs: Array<J>): Promise<void> => {
  const jobSecret = getRequiredEnvVar(`JOB_SECRET`);

  jobs.forEach((job) => {
    const jobUrl = JobRoute.getAbsoluteUrl({
      params: { jobName: job.name },
      searchParams: { data: job.data },
    });

    fetch(jobUrl, {
      method: `GET`,
      headers: {
        Authorization: `Bearer ${jobSecret}`,
        'Content-Type': `application/json`,
      },
    });
  });

  // Prevent fetch events from getting canceled
  await sleep(3000);
};
