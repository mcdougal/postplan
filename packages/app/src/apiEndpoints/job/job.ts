import { getRequiredEnvVar } from '@/common/env';
import { JobSchema } from '@/common/jobs';
import { JobRoute, JobRouteParams, JobRouteResponse } from '@/common/routes';
import {
  refreshInstagramAccessAllUsers,
  refreshInstagramAccessOneUser,
  runNightlyTasks,
  syncInstagramAllUsers,
  syncInstagramOneUser,
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

  if (job.name === `refreshInstagramAccessAllUsers`) {
    await refreshInstagramAccessAllUsers();
  } else if (job.name === `refreshInstagramAccessOneUser`) {
    await refreshInstagramAccessOneUser(job.data);
  } else if (job.name === `runNightlyTasks`) {
    await runNightlyTasks();
  } else if (job.name === `syncInstagramAllUsers`) {
    await syncInstagramAllUsers();
  } else if (job.name === `syncInstagramOneUser`) {
    await syncInstagramOneUser(job.data);
  } else {
    const exhaustiveCheck: never = job;
    return exhaustiveCheck;
  }

  return NextResponse.json({ success: true });
};
