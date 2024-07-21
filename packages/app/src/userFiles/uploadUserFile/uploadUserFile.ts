type Response = { status: `error`; message: string } | { status: `success` };

export default async (fileUploadUrl: string, file: File): Promise<Response> => {
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
    return { status: `error`, message: `Error uploading file` };
  }

  return { status: `success` };
};
