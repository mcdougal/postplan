import { Job } from '@/common/jobs';
import { Inngest } from 'inngest';

const inngest = new Inngest({ id: `postplan` });

export default async <J extends Job>(job: J): Promise<void> => {
  // eslint-disable-next-line no-console
  console.log(`addJobToQueue ${job.name}`);
  await inngest.send({
    name: job.name,
    data: job.data,
  });
};
