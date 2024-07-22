import { getRequiredEnvVar } from '@/common/env';
import { JobSchema } from '@/common/jobs';
import { JobRoute, JobRouteParams, JobRouteResponse } from '@/common/routes';
import { sleep } from '@/common/sleep';
import {
  createThumbnails,
  refreshInstagramConnections,
  refreshMediaUrls,
  runNightlyTasks,
  syncInstagram,
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
      if (job.name === `createThumbnails`) {
        await createThumbnails();
      } else if (job.name === `refreshInstagramConnections`) {
        await refreshInstagramConnections();
      } else if (job.name === `refreshMediaUrls`) {
        await refreshMediaUrls();
      } else if (job.name === `runNightlyTasks`) {
        await runNightlyTasks();
      } else if (job.name === `syncInstagram`) {
        await syncInstagram(job.data);
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
