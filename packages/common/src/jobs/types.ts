import { z } from 'zod';

export const CreateThumbnailsJobSchema = z.object({
  name: z.literal(`createThumbnails`),
  data: z.object({
    instagramSyncJobId: z.string().optional(),
  }),
});

export const DeleteOldPostsThenRefreshMediaUrlsJobSchema = z.object({
  name: z.literal(`deleteOldPostsThenRefreshMediaUrls`),
  data: z.object({}),
});

export const RecreateActualPostsSchema = z.object({
  name: z.literal(`recreateActualPosts`),
  data: z.object({
    userId: z.string(),
  }),
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
    batchId: z.string().optional(),
    force: z.boolean(),
    userId: z.string(),
  }),
});

export const JobSchema = z.union([
  CreateThumbnailsJobSchema,
  DeleteOldPostsThenRefreshMediaUrlsJobSchema,
  RecreateActualPostsSchema,
  RefreshInstagramConnectionsJobSchema,
  RefreshMediaUrlsJobSchema,
  RunNightlyTasksJobSchema,
  SyncInstagramJobSchema,
]);

export type Job = z.infer<typeof JobSchema>;
export type CreateThumbnailsJob = z.infer<typeof CreateThumbnailsJobSchema>;
export type DeleteOldPostsThenRefreshMediaUrlsJob = z.infer<
  typeof DeleteOldPostsThenRefreshMediaUrlsJobSchema
>;
export type RecreateActualPostsJob = z.infer<typeof RecreateActualPostsSchema>;
export type RefreshInstagramConnectionsJob = z.infer<
  typeof RefreshInstagramConnectionsJobSchema
>;
export type RefreshMediaUrlsJob = z.infer<typeof RefreshMediaUrlsJobSchema>;
export type RunNightlyTasksJob = z.infer<typeof RunNightlyTasksJobSchema>;
export type SyncInstagramJob = z.infer<typeof SyncInstagramJobSchema>;
