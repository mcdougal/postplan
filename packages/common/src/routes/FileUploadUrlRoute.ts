import { z } from 'zod';

import { makeRoute } from './utils';

export type FileUploadUrlRouteParams = {
  fileName: string;
  userId: string;
};

export const FileUploadUrlRouteResponseSchema = z.object({
  fileUploadUrl: z.string(),
});

export type FileUploadUrlRouteResponse = z.infer<
  typeof FileUploadUrlRouteResponseSchema
>;

export default makeRoute<FileUploadUrlRouteParams>({
  path: ({ params }) => {
    return `/files/${params.userId}/${params.fileName}/upload/url`;
  },
});
