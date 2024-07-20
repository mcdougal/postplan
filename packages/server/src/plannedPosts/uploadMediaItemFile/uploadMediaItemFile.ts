import { getThumbnailFileName } from '@/common/userFiles';
import axios from 'axios';
import sharp from 'sharp';

import { ForbiddenError } from '@/server/auth';
import { generateFileUploadUrl } from '@/server/userFiles';

type Args = {
  auth: {
    currentUserId: string;
  };
  data: {
    file: File;
    fileName: string;
    userId: string;
  };
};

export default async (args: Args): Promise<void> => {
  const { currentUserId } = args.auth;
  const { file, fileName, userId } = args.data;

  if (currentUserId !== userId) {
    throw new ForbiddenError();
  }

  const thumbnailFileName = getThumbnailFileName(fileName);
  const fileArrayBuffer = await file.arrayBuffer();

  const resizedBuffer = await sharp(fileArrayBuffer)
    .resize(250, 250)
    .jpeg()
    .toBuffer();

  const fullResFileUploadUrl = await generateFileUploadUrl({
    auth: { currentUserId: userId },
    data: { fileName, userId },
  });

  const thumbnailFileUploadUrl = await generateFileUploadUrl({
    auth: { currentUserId: userId },
    data: { fileName: thumbnailFileName, userId },
  });

  await axios.put(fullResFileUploadUrl, fileArrayBuffer, {
    headers: {
      'Access-Control-Allow-Origin': `*`,
      'Content-Type': `image/jpeg`,
    },
  });

  await axios.put(thumbnailFileUploadUrl, resizedBuffer, {
    headers: {
      'Access-Control-Allow-Origin': `*`,
      'Content-Type': `image/jpeg`,
    },
  });
};
