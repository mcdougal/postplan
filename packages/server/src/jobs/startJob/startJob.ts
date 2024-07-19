import { getRequiredEnvVar } from '@/common/env';
import { Job } from '@/common/jobs';
import { JobRoute } from '@/common/routes';

export default <J extends Job>(job: J): void => {
  const jobSecret = getRequiredEnvVar(`JOB_SECRET`);

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
};
