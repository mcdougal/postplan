import { getRequiredEnvVar } from '@/common/env';
import { Job } from '@/common/jobs';
import { JobRoute } from '@/common/routes';

type Options = {
  wait?: boolean;
};

export default async <J extends Job>(
  jobs: Array<J>,
  options?: Options
): Promise<void> => {
  const { wait = false } = options || {};

  const jobSecret = getRequiredEnvVar(`JOB_SECRET`);

  if (wait) {
    await Promise.all(
      jobs.map((job) => {
        const jobUrl = JobRoute.getAbsoluteUrl({
          params: { jobName: job.name },
          searchParams: { data: job.data },
        });

        return fetch(jobUrl, {
          method: `GET`,
          headers: {
            Authorization: `Bearer ${jobSecret}`,
            'Content-Type': `application/json`,
          },
        });
      })
    );
  } else {
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
  }
};
