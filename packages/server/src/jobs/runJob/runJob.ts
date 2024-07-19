import { getRequiredEnvVar } from '@/common/env';
import { Job } from '@/common/jobs';
import { JobRoute } from '@/common/routes';

export default async <J extends Job>(job: J): Promise<void> => {
  const jobSecret = getRequiredEnvVar(`JOB_SECRET`);

  const jobUrl = JobRoute.getAbsoluteUrl({
    params: { jobName: job.name },
    searchParams: { data: job.data },
  });

  const result = await fetch(jobUrl, {
    method: `GET`,
    headers: {
      Authorization: `Bearer ${jobSecret}`,
      'Content-Type': `application/json`,
    },
  });

  if (!result.ok) {
    throw new Error(
      `Job failed to start: ${result.status} ${result.statusText}`
    );
  }
};
