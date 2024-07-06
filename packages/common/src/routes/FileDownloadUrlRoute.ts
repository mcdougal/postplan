import { z } from 'zod';

import { makeRoute } from './utils';

export type FileDownloadUrlRouteParams = {
  fileName: string;
  userId: string;
};

export const FileDownloadUrlRouteResponseSchema = z.object({
  fileDownloadUrl: z.string(),
});

export type FileDownloadUrlRouteResponse = z.infer<
  typeof FileDownloadUrlRouteResponseSchema
>;

export default makeRoute<FileDownloadUrlRouteParams>({
  path: ({ params }) => {
    return `/files/${params.userId}/${params.fileName}/download/url`;
  },
});
