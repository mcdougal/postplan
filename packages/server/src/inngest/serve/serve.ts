import { Job } from '@/common/jobs';
import { Inngest, InngestFunction } from 'inngest';
import { serve } from 'inngest/next';

import {
  createThumbnails,
  refreshInstagramConnections,
  refreshMediaUrls,
  runNightlyTasks,
  syncInstagram,
  syncInstagramFromRapidApi,
} from '@/server/jobs';

const inngest = new Inngest({ id: `postplan` });

const makeJobFunction = <J extends Job>(
  jobName: J['name'],
  jobHandler: (job: J) => Promise<void>
): InngestFunction.Any => {
  return inngest.createFunction(
    { id: jobName },
    { event: jobName },
    async ({ event }) => {
      // eslint-disable-next-line @postplan/no-type-assertion, @typescript-eslint/no-explicit-any
      await jobHandler({ name: jobName, data: event.data } as any);
      return { event };
    }
  );
};

const functions: { [key in Job['name']]: InngestFunction.Any } = {
  createThumbnails: makeJobFunction(`createThumbnails`, createThumbnails),
  refreshInstagramConnections: makeJobFunction(
    `refreshInstagramConnections`,
    refreshInstagramConnections
  ),
  refreshMediaUrls: makeJobFunction(`refreshMediaUrls`, refreshMediaUrls),
  runNightlyTasks: makeJobFunction(`runNightlyTasks`, runNightlyTasks),
  syncInstagram: makeJobFunction(`syncInstagram`, syncInstagram),
  syncInstagramFromRapidApi: makeJobFunction(
    `syncInstagramFromRapidApi`,
    syncInstagramFromRapidApi
  ),
};

export default serve({
  client: inngest,
  functions: Object.values(functions),
});
