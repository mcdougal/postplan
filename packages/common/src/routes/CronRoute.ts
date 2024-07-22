import { addSearchParams, makeRoute, parseOptionalJson } from './utils';

export type CronRouteParams = {
  jobName: string;
};

export type CronRouteSearchParams = {
  data?: Record<string, unknown>;
};

export type CronRouteResponse = {
  success: true;
};

export default makeRoute<CronRouteParams, CronRouteSearchParams>({
  path: ({ params, searchParams }) => {
    return addSearchParams(`/cron/${params.jobName}`, {
      data: JSON.stringify(searchParams.data),
    });
  },
  parse: (searchParams) => {
    const data = parseOptionalJson(searchParams, `data`);

    return {
      data,
    };
  },
});
