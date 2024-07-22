import { Inngest } from 'inngest';
import { serve } from 'inngest/next';

const inngest = new Inngest({ id: `postplan` });

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    inngest.createFunction(
      { id: `create-thumbnails` },
      { event: `create-thumbnails` },
      async ({ event, step }) => {
        await step.sleep(`wait-a-moment`, `1s`);
        return { event, body: `Hello, World!` };
      }
    ),
  ],
});
