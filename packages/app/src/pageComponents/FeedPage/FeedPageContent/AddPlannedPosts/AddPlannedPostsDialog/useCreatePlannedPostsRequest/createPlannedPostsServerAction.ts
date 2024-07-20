'use server';

import { createPlannedPost, uploadMediaItemFile } from '@/server/plannedPosts';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { authenticatedServerAction } from '@/app/serverActions';

const FormDataSchema = z.object({
  isReel: z.boolean(),
  plannedPosts: z.array(
    z.object({
      files: z.array(
        z.object({
          fileName: z.string(),
          height: z.number(),
          width: z.number(),
        })
      ),
    })
  ),
  userId: z.string(),
});

type Args = {
  data: FormData;
};

export default authenticatedServerAction<Args>({
  errorMessage: `Error creating posts`,
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

    const { isReel, plannedPosts, userId } = parsed.data;

    await Promise.all(
      plannedPosts.map(async (plannedPost) => {
        await Promise.all(
          plannedPost.files.map(async ({ fileName }) => {
            const file = formData.get(fileName);

            if (!(file instanceof File)) {
              return;
            }

            await uploadMediaItemFile({
              auth: { currentUserId: currentUser.id },
              data: { file, fileName, userId },
            });
          })
        );

        await createPlannedPost({
          auth: {
            currentUserId: currentUser.id,
          },
          data: {
            isReel,
            mediaItems: plannedPost.files.map((file) => {
              return {
                fileName: file.fileName,
                height: file.height,
                width: file.width,
              };
            }),
            userId,
          },
        });
      })
    );

    revalidatePath(`/`, `layout`);

    return { status: `success` };
  },
});
