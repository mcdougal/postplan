import {
  FileUploadUrlRoute,
  FileUploadUrlRouteResponseSchema,
} from '@/domain/routes/common';

type Args = {
  file: File;
  userId: string;
};

export default async ({ file, userId }: Args): Promise<void> => {
  const fileUploadUrlResponse = await fetch(
    FileUploadUrlRoute.getPath({
      params: { fileName: file.name, userId },
    })
  );

  if (!fileUploadUrlResponse.ok) {
    throw new Error(`Failed to fetch file upload URL`);
  }

  const { fileUploadUrl } = FileUploadUrlRouteResponseSchema.parse(
    await fileUploadUrlResponse.json()
  );

  const fileUploadFormData = new FormData();
  fileUploadFormData.append(`file`, file);

  const fileUploadResponse = await fetch(fileUploadUrl, {
    body: fileUploadFormData,
    method: `PUT`,
    headers: {
      'Access-Control-Allow-Origin': `*`,
      'Content-Length': file.size.toString(),
    },
  });

  if (!fileUploadResponse.ok) {
    throw new Error(`Failed to upload file`);
  }
};
