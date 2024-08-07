'use server';

import { setInstagramUsername } from '@/server/instagram';
import { z } from 'zod';

import { authenticatedServerAction } from '@/app/serverActions';

const FormDataSchema = z.object({
  instagramUsername: z.string({ message: `Instagram username is required` }),
});

export default authenticatedServerAction<FormData>({
  errorMessage: `Error setting username`,
  serverAction: async (formData, currentUser) => {
    const parsed = FormDataSchema.safeParse({
      instagramUsername: formData.get(`instagramUsername`),
    });

    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      return {
        status: `error`,
        message:
          (errors.instagramUsername && errors.instagramUsername[0]) ||
          `An error occurred`,
      };
    }

    const { instagramUsername } = parsed.data;
    const usernameCleaned = instagramUsername.replace(/^@/, ``).trim();

    if (!usernameCleaned) {
      return {
        status: `error`,
        message: `Instagram username is required`,
      };
    }

    await setInstagramUsername({
      auth: { currentUserId: currentUser.id },
      data: { instagramUsername: usernameCleaned },
      where: { userId: currentUser.id },
    });

    return { status: `success` };
  },
});
