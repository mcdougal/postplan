import { useState } from 'react';

import { uploadUserFile } from '@/app/userFiles';

import fileUploadUrlServerAction from './fileUploadUrlServerAction';

type Response = { status: `error`; message: string } | { status: `success` };

type UploadFile = (userId: string, file: File) => Promise<Response>;

type UploadFileRequest = {
  error: string | null;
  uploadFile: UploadFile;
  loading: boolean;
};

export default (): UploadFileRequest => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile: UploadFile = async (userId, file) => {
    setLoading(true);
    setError(null);

    const uploadUrlResponse = await fileUploadUrlServerAction({
      data: {
        fileName: file.name,
        userId,
      },
    });

    if (uploadUrlResponse.status === `error`) {
      setLoading(false);
      setError(uploadUrlResponse.message);
      return { status: `error`, message: uploadUrlResponse.message };
    }

    const uploadResponse = await uploadUserFile(
      uploadUrlResponse.data.fileUploadUrl,
      file
    );

    if (uploadResponse.status === `error`) {
      setLoading(false);
      setError(uploadResponse.message);
      return { status: `error`, message: uploadResponse.message };
    }

    setLoading(false);

    return { status: `success` };
  };

  return {
    error,
    loading,
    uploadFile,
  };
};
