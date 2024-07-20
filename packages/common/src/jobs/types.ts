import { z } from 'zod';

export const RefreshActualPostMediaUrlsAllUsersJobSchema = z.object({
  name: z.literal(`refreshActualPostMediaUrlsAllUsers`),
  data: z.object({}),
});

export const RefreshActualPostMediaUrlsOneUserJobSchema = z.object({
  name: z.literal(`refreshActualPostMediaUrlsOneUser`),
  data: z.object({ userId: z.string() }),
});

export const RefreshInstagramAccessAllUsersJobSchema = z.object({
  name: z.literal(`refreshInstagramAccessAllUsers`),
  data: z.object({}),
});

export const RefreshInstagramAccessOneUserJobSchema = z.object({
  name: z.literal(`refreshInstagramAccessOneUser`),
  data: z.object({ connectionId: z.string() }),
});

export const RefreshPlannedPostMediaUrlsAllUsersJobSchema = z.object({
  name: z.literal(`refreshPlannedPostMediaUrlsAllUsers`),
  data: z.object({}),
});

export const RefreshPlannedPostMediaUrlsOneUserJobSchema = z.object({
  name: z.literal(`refreshPlannedPostMediaUrlsOneUser`),
  data: z.object({ userId: z.string() }),
});

export const RunNightlyTasksJobSchema = z.object({
  name: z.literal(`runNightlyTasks`),
  data: z.object({}),
});

export const SyncInstagramAllUsersJobSchema = z.object({
  name: z.literal(`syncInstagramAllUsers`),
  data: z.object({}),
});

export const SyncInstagramOneUserJobSchema = z.object({
  name: z.literal(`syncInstagramOneUser`),
  data: z.object({ connectionId: z.string() }),
});

export const UploadActualPostThumbnailJobSchema = z.object({
  name: z.literal(`uploadActualPostThumbnail`),
  data: z.object({ actualPostId: z.string() }),
});

export const UploadPlannedPostMediaItemThumbnailJobSchema = z.object({
  name: z.literal(`uploadPlannedPostMediaItemThumbnail`),
  data: z.object({ plannedPostMediaItemId: z.string() }),
});

export const JobSchema = z.union([
  RefreshActualPostMediaUrlsAllUsersJobSchema,
  RefreshActualPostMediaUrlsOneUserJobSchema,
  RefreshInstagramAccessAllUsersJobSchema,
  RefreshInstagramAccessOneUserJobSchema,
  RefreshPlannedPostMediaUrlsAllUsersJobSchema,
  RefreshPlannedPostMediaUrlsOneUserJobSchema,
  RunNightlyTasksJobSchema,
  SyncInstagramAllUsersJobSchema,
  SyncInstagramOneUserJobSchema,
  UploadActualPostThumbnailJobSchema,
  UploadPlannedPostMediaItemThumbnailJobSchema,
]);

export type Job = z.infer<typeof JobSchema>;
export type RefreshActualPostMediaUrlsAllUsersJob = z.infer<
  typeof RefreshActualPostMediaUrlsAllUsersJobSchema
>;
export type RefreshActualPostMediaUrlsOneUserJob = z.infer<
  typeof RefreshActualPostMediaUrlsOneUserJobSchema
>;
export type RefreshInstagramAccessAllUsersJob = z.infer<
  typeof RefreshInstagramAccessAllUsersJobSchema
>;
export type RefreshInstagramAccessOneUserJob = z.infer<
  typeof RefreshInstagramAccessOneUserJobSchema
>;
export type RefreshPlannedPostMediaUrlsAllUsersJob = z.infer<
  typeof RefreshPlannedPostMediaUrlsAllUsersJobSchema
>;
export type RefreshPlannedPostMediaUrlsOneUserJob = z.infer<
  typeof RefreshPlannedPostMediaUrlsOneUserJobSchema
>;
export type RunNightlyTasksJob = z.infer<typeof RunNightlyTasksJobSchema>;
export type SyncInstagramAllUsersJob = z.infer<
  typeof SyncInstagramAllUsersJobSchema
>;
export type SyncInstagramOneUserJob = z.infer<
  typeof SyncInstagramOneUserJobSchema
>;
export type UploadActualPostThumbnailJob = z.infer<
  typeof UploadActualPostThumbnailJobSchema
>;
export type UploadPlannedPostMediaItemThumbnailJob = z.infer<
  typeof UploadPlannedPostMediaItemThumbnailJobSchema
>;
