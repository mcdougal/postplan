import { z } from 'zod';

export const RefreshAllInstagramAccessTokensJobSchema = z.object({
  name: z.literal(`refreshAllInstagramAccessTokens`),
  data: z.object({}),
});

export const RefreshOneInstagramAccessTokenJobSchema = z.object({
  name: z.literal(`refreshOneInstagramAccessToken`),
  data: z.object({
    connectionId: z.string(),
  }),
});

export const SyncInstagramAllUsersJobSchema = z.object({
  name: z.literal(`syncInstagramAllUsers`),
  data: z.object({}),
});

export const SyncInstagramOneUserJobSchema = z.object({
  name: z.literal(`syncInstagramOneUser`),
  data: z.object({
    connectionId: z.string(),
  }),
});

export const JobSchema = z.union([
  RefreshAllInstagramAccessTokensJobSchema,
  RefreshOneInstagramAccessTokenJobSchema,
  SyncInstagramAllUsersJobSchema,
  SyncInstagramOneUserJobSchema,
]);

export type Job = z.infer<typeof JobSchema>;
export type RefreshAllInstagramAccessTokensJob = z.infer<
  typeof RefreshAllInstagramAccessTokensJobSchema
>;
export type RefreshOneInstagramAccessTokenJob = z.infer<
  typeof RefreshOneInstagramAccessTokenJobSchema
>;
export type SyncInstagramAllUsersJob = z.infer<
  typeof SyncInstagramAllUsersJobSchema
>;
export type SyncInstagramOneUserJob = z.infer<
  typeof SyncInstagramOneUserJobSchema
>;
