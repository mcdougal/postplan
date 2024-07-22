export type CronRouteParams = {
  jobName: string;
};

export type CronRouteSearchParams = {
  data?: Record<string, unknown>;
};

export type CronRouteResponse = {
  success: true;
};

export default {
  getPath: ({
    params,
    searchParams,
  }: {
    params: CronRouteParams;
    searchParams: CronRouteSearchParams;
  }): string => {
    return `/cron/${params.jobName}?${JSON.stringify(searchParams.data)}`;
  },
  parse: (searchParams: URLSearchParams): CronRouteSearchParams => {
    const dataRaw = searchParams.get(`data`);
    const data = dataRaw ? JSON.parse(dataRaw) : undefined;

    return {
      data,
    };
  },
};
