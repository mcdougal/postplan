import { addSearchParams, makeRoute, parseOptionalJson } from './utils';

export type JobRouteParams = {
  jobName: string;
};

export type JobRouteSearchParams = {
  data?: Record<string, unknown>;
};

export type JobRouteResponse = {
  success: true;
};

export default makeRoute<JobRouteParams, JobRouteSearchParams>({
  path: ({ params, searchParams }) => {
    return addSearchParams(`/job/${params.jobName}`, {
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
