import { getMediaItems } from '@/common/plannedPosts';
import { getThumbnailFileName } from '@/common/userFiles';

import { generateFileDownloadUrl } from '@/server/userFiles';

import { PlannedPost } from '../queryPlannedPosts';

type Args = {
  auth: {
    currentUserId: string;
  };
  where: {
    plannedPosts: Array<PlannedPost>;
  };
  size: `full` | `thumbnail`;
};

export default async (args: Args): Promise<Map<string, string>> => {
  const { currentUserId } = args.auth;
  const { plannedPosts } = args.where;
  const size = args.size;

  const downloadUrlByMediaItemId = new Map<string, string>();

  await Promise.all(
    plannedPosts.map(async (plannedPost) => {
      await Promise.all(
        getMediaItems(plannedPost).map(async (mediaItem) => {
          const fileName =
            size === `thumbnail`
              ? getThumbnailFileName(mediaItem.fileName)
              : mediaItem.fileName;

          const downloadUrl = await generateFileDownloadUrl({
            auth: { currentUserId },
            where: { fileName, userId: plannedPost.userId },
          });

          downloadUrlByMediaItemId.set(mediaItem.id, downloadUrl);
        })
      );
    })
  );

  return downloadUrlByMediaItemId;
};
