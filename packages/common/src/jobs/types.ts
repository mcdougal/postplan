import { z } from 'zod';

export const CreateThumbnailsJobSchema = z.object({
  name: z.literal(`createThumbnails`),
  data: z.object({}),
});

export const RefreshInstagramConnectionsJobSchema = z.object({
  name: z.literal(`refreshInstagramConnections`),
  data: z.object({}),
});

export const RefreshMediaUrlsJobSchema = z.object({
  name: z.literal(`refreshMediaUrls`),
  data: z.object({}),
});

export const RunNightlyTasksJobSchema = z.object({
  name: z.literal(`runNightlyTasks`),
  data: z.object({}),
});

export const SyncInstagramJobSchema = z.object({
  name: z.literal(`syncInstagram`),
  data: z.object({
    connectionId: z.string().optional(),
    single: z.boolean().optional(),
  }),
});

export const SyncInstagramFromRapidApiJobSchema = z.object({
  name: z.literal(`syncInstagramFromRapidApi`),
  data: z.object({
    force: z.boolean(),
    userId: z.string(),
  }),
});

export const JobSchema = z.union([
  CreateThumbnailsJobSchema,
  RefreshInstagramConnectionsJobSchema,
  RefreshMediaUrlsJobSchema,
  RunNightlyTasksJobSchema,
  SyncInstagramJobSchema,
  SyncInstagramFromRapidApiJobSchema,
]);

export type Job = z.infer<typeof JobSchema>;
export type CreateThumbnailsJob = z.infer<typeof CreateThumbnailsJobSchema>;
export type RefreshInstagramConnectionsJob = z.infer<
  typeof RefreshInstagramConnectionsJobSchema
>;
export type RefreshMediaUrlsJob = z.infer<typeof RefreshMediaUrlsJobSchema>;
export type RunNightlyTasksJob = z.infer<typeof RunNightlyTasksJobSchema>;
export type SyncInstagramJob = z.infer<typeof SyncInstagramJobSchema>;
export type SyncInstagramFromRapidApiJob = z.infer<
  typeof SyncInstagramFromRapidApiJobSchema
>;
