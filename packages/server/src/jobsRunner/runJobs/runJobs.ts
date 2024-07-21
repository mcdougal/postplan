import { getRequiredEnvVar } from '@/common/env';
import { Job } from '@/common/jobs';
import { JobRoute } from '@/common/routes';
import { sleep } from '@/common/sleep';

type Options = {
  /**
   * Wait for all jobs to finish before returning.
   */
  wait?: boolean;
};

export default async <J extends Job>(
  jobs: Array<J>,
  options?: Options
): Promise<void> => {
  const jobSecret = getRequiredEnvVar(`JOB_SECRET`);

  if (options?.wait) {
    await Promise.all(
      jobs.map(async (job) => {
        const jobUrl = JobRoute.getAbsoluteUrl({
          params: { jobName: job.name },
          searchParams: { data: job.data },
        });

        return await fetch(jobUrl, {
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

  // If a Vercel function terminates before all fetch requests have initiated,
  // then the fetch requests will not be triggered.
  await sleep(100);
};
