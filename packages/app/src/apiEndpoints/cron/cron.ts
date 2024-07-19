import { getRequiredEnvVar } from '@/common/env';
import { CronRouteParams, CronRouteResponse } from '@/common/routes';
import { collectHashtags, refreshInstagramAccessTokens } from '@/server/cron';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import { GetHandlerJson } from '../types';
import { notFound, unauthorized } from '../utils';

const CRON_SECRET = getRequiredEnvVar(`CRON_SECRET`);

type GetHandler = GetHandlerJson<CronRouteParams, CronRouteResponse>;

export const GET: GetHandler = async (request, { params }) => {
  const headersList = headers();
  const authHeader = headersList.get(`authorization`);

  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return unauthorized();
  }

  const { jobName } = params;

  if (jobName === `collectHashtags`) {
    await collectHashtags();
  } else if (jobName === `refreshInstagramAccessTokens`) {
    await refreshInstagramAccessTokens();
  } else {
    return notFound();
  }

  return NextResponse.json({ success: true });
};
