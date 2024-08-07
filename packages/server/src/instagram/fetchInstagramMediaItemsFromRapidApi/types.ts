import { z } from 'zod';

export const InstagramApiMediaItemSchema = z.object({
  caption: z.object({ text: z.string() }).optional(),
  code: z.string(),
  display_uri_original: z.string(),
  image_versions2: z.object({
    candidates: z.array(
      z.object({
        height: z.number(),
        url_original: z.string(),
        width: z.number(),
      })
    ),
  }),
  media_type: z.union([z.literal(1), z.literal(2), z.literal(8)]),
  original_height: z.number(),
  original_width: z.number(),
  pk: z.string(),
  taken_at: z.number(),
});

export type InstagramApiMediaItem = z.infer<typeof InstagramApiMediaItemSchema>;

export const InstagramApiMediaResponseSchema = z.object({
  items: z.array(InstagramApiMediaItemSchema),
  next_max_id: z.string().nullable().optional(),
});
