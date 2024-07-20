import { getThumbnailFileName } from '@/common/userFiles';
import { db, eq } from '@/db/connection';
import { actualPost } from '@/db/schema';
import { forEachSeries } from 'p-iteration';

import { ForbiddenError } from '@/server/auth';
import { generateFileDownloadUrl } from '@/server/userFiles';

type Args = {
  auth: {
    currentUserId: string;
  };
  where: {
    userId: string;
  };
};

export default async (args: Args): Promise<void> => {
  const { currentUserId } = args.auth;
  const { userId } = args.where;

  if (currentUserId !== userId) {
    throw new ForbiddenError();
  }

  const actualPosts = await db.query.actualPost.findMany({
    where: eq(actualPost.userId, userId),
    columns: { fileName: true, id: true },
  });

  await forEachSeries(actualPosts, async ({ fileName, id }) => {
    const mediaThumbnailUrl = await generateFileDownloadUrl({
      auth: { currentUserId },
      where: { fileName: getThumbnailFileName(fileName), userId },
    });

    await db
      .update(actualPost)
      .set({ mediaThumbnailUrl })
      .where(eq(actualPost.id, id));
  });
};