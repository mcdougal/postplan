'use server';

import { createMediaItem, uploadMediaItemFile } from '@/server/plannedPosts';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { authenticatedServerAction } from '@/app/serverActions';

const FormDataSchema = z.object({
  mediaItems: z.array(
    z.object({
      fileName: z.string(),
      height: z.number(),
      width: z.number(),
    })
  ),
  plannedPostId: z.string(),
  userId: z.string(),
});

type Args = {
  data: FormData;
};

export default authenticatedServerAction<Args>({
  errorMessage: `Error adding to carousel`,
  serverAction: async (args, currentUser) => {
    const formData = args.data;
    const dataJson = formData.get(`data`);

    if (!(typeof dataJson === `string`)) {
      return { status: `error`, message: `Bad form submission` };
    }

    const parsed = FormDataSchema.safeParse(JSON.parse(dataJson));

    if (!parsed.success) {
      return { status: `error`, message: `Bad form submission` };
    }

    const { mediaItems, plannedPostId, userId } = parsed.data;

    await Promise.all(
      mediaItems.map(async ({ fileName, height, width }) => {
        const file = formData.get(fileName);

        if (!(file instanceof File)) {
          return;
        }

        await uploadMediaItemFile({
          auth: { currentUserId: currentUser.id },
          data: { file, fileName, userId },
        });

        await createMediaItem({
          auth: { currentUserId: currentUser.id },
          data: { fileName, height, plannedPostId, width },
        });
      })
    );

    revalidatePath(`/`, `layout`);

    return { status: `success` };
  },
});
