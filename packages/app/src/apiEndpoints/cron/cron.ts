import { getRequiredEnvVar } from '@/common/env';
import { JobSchema } from '@/common/jobs';
import { CronRoute, CronRouteParams, CronRouteResponse } from '@/common/routes';
import { addJobToQueue } from '@/server/jobsQueue';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import { GetHandlerJson } from '../types';
import { badRequest, unauthorized } from '../utils';

type GetHandler = GetHandlerJson<CronRouteParams, CronRouteResponse>;

export const GET: GetHandler = async (request, { params }) => {
  const cronSecret = getRequiredEnvVar(`CRON_SECRET`);
  const headersList = headers();
  const authHeader = headersList.get(`authorization`);

  if (authHeader !== `Bearer ${cronSecret}`) {
    return unauthorized();
  }

  const { jobName } = params;
  const { data } = CronRoute.parse(request.nextUrl.searchParams);
  const jobParsed = JobSchema.safeParse({ name: jobName, data: data || {} });

  if (!jobParsed.success) {
    return badRequest();
  }

  const job = jobParsed.data;

  await addJobToQueue(job);

  return NextResponse.json({ success: true });
};
