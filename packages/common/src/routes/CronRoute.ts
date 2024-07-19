import { makeRoute } from './utils';

export type CronRouteParams = {
  jobName: string;
};

export type CronRouteResponse = {
  success: true;
};

export default makeRoute<CronRouteParams>({
  path: ({ params }) => {
    return `/cron/${params.jobName}`;
  },
});
