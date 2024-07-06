import { PlannedPost } from '@/domain/plannedPosts/server';
import {
  FileDownloadUrlRoute,
  FileDownloadUrlRouteResponseSchema,
} from '@/domain/routes/common';
import { useEffect, useState } from 'react';

type FileDownloadUrlRequestData = { fileDownloadUrl: string };

type FileDownloadUrlRequest = {
  data: FileDownloadUrlRequestData | undefined;
  loading: boolean;
};

export default (plannedPost: PlannedPost): FileDownloadUrlRequest => {
  const [data, setData] = useState<FileDownloadUrlRequestData | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const run = async (): Promise<void> => {
      setLoading(true);

      const firstMediaItem =
        plannedPost.mediaItems.length > 0 ? plannedPost.mediaItems[0] : null;

      if (!firstMediaItem) {
        setLoading(false);
        return;
      }

      const fileDownloadUrlResponse = await fetch(
        FileDownloadUrlRoute.getPath({
          params: {
            fileName: firstMediaItem.fileName,
            userId: plannedPost.userId,
          },
        })
      );

      if (!fileDownloadUrlResponse.ok) {
        throw new Error(`Failed to get document download URL`);
      }

      const { fileDownloadUrl } = FileDownloadUrlRouteResponseSchema.parse(
        await fileDownloadUrlResponse.json()
      );

      setData({ fileDownloadUrl });
      setLoading(false);
    };

    run();
  }, [plannedPost]);

  return {
    data,
    loading,
  };
};
