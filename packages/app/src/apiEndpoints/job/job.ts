import { getRequiredEnvVar } from '@/common/env';
import { JobSchema } from '@/common/jobs';
import { JobRoute, JobRouteParams, JobRouteResponse } from '@/common/routes';
import { sleep } from '@/common/sleep';
import {
  refreshActualPostMediaUrlsAllUsers,
  refreshActualPostMediaUrlsOneUser,
  refreshInstagramAccessAllUsers,
  refreshInstagramAccessOneUser,
  refreshPlannedPostMediaUrlsAllUsers,
  refreshPlannedPostMediaUrlsOneUser,
  runNightlyTasks,
  syncInstagramAllUsers,
  syncInstagramOneUser,
  uploadActualPostThumbnail,
  uploadPlannedPostMediaItemThumbnail,
} from '@/server/jobs';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import { GetHandlerJson } from '../types';
import { badRequest, unauthorized } from '../utils';

type GetHandler = GetHandlerJson<JobRouteParams, JobRouteResponse>;

export const GET: GetHandler = async (request, { params }) => {
  const jobSecret = getRequiredEnvVar(`JOB_SECRET`);
  const headersList = headers();
  const authHeader = headersList.get(`authorization`);

  if (authHeader !== `Bearer ${jobSecret}`) {
    return unauthorized();
  }

  const { jobName } = params;
  const { data } = JobRoute.parse(request.nextUrl.searchParams);
  const jobParsed = JobSchema.safeParse({ name: jobName, data: data || {} });

  if (!jobParsed.success) {
    return badRequest();
  }

  const job = jobParsed.data;

  let numRetries = 2;
  let error: unknown = new Error(`Unexpected error`);

  while (numRetries > 0) {
    try {
      if (job.name === `refreshActualPostMediaUrlsAllUsers`) {
        await refreshActualPostMediaUrlsAllUsers();
      } else if (job.name === `refreshActualPostMediaUrlsOneUser`) {
        await refreshActualPostMediaUrlsOneUser(job.data);
      } else if (job.name === `refreshInstagramAccessAllUsers`) {
        await refreshInstagramAccessAllUsers();
      } else if (job.name === `refreshInstagramAccessOneUser`) {
        await refreshInstagramAccessOneUser(job.data);
      } else if (job.name === `refreshPlannedPostMediaUrlsAllUsers`) {
        await refreshPlannedPostMediaUrlsAllUsers();
      } else if (job.name === `refreshPlannedPostMediaUrlsOneUser`) {
        await refreshPlannedPostMediaUrlsOneUser(job.data);
      } else if (job.name === `runNightlyTasks`) {
        await runNightlyTasks();
      } else if (job.name === `syncInstagramAllUsers`) {
        await syncInstagramAllUsers();
      } else if (job.name === `syncInstagramOneUser`) {
        await syncInstagramOneUser(job.data);
      } else if (job.name === `uploadActualPostThumbnail`) {
        await uploadActualPostThumbnail(job.data);
      } else if (job.name === `uploadPlannedPostMediaItemThumbnail`) {
        await uploadPlannedPostMediaItemThumbnail(job.data);
      } else {
        const exhaustiveCheck: never = job;
        return exhaustiveCheck;
      }

      return NextResponse.json({ success: true });
    } catch (err) {
      numRetries -= 1;
      error = err;
      await sleep(1000);
    }
  }

  throw error;
};
