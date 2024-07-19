import axios from 'axios';
import sharp from 'sharp';

import { generateFileUploadUrl } from '@/server/userFiles';

import { InstagramMediaItem } from '../../types';

export default async (
  userId: string,
  thumbnailFileName: string,
  instagramMediaItem: InstagramMediaItem
): Promise<void> => {
  const mediaResponse = await fetch(
    instagramMediaItem.thumbnailUrl || instagramMediaItem.mediaUrl
  );

  if (!mediaResponse.ok) {
    throw new Error(`Failed to fetch media`);
  }

  const blob = await mediaResponse.blob();

  const resizedBuffer = await sharp(Buffer.from(await blob.arrayBuffer()))
    .resize(250, 250)
    .jpeg()
    .toBuffer();

  const fileUploadUrl = await generateFileUploadUrl({
    auth: { currentUserId: userId },
    data: { fileName: thumbnailFileName, userId },
  });

  await axios.put(fileUploadUrl, resizedBuffer, {
    headers: {
      'Access-Control-Allow-Origin': `*`,
      'Content-Type': `image/jpeg`,
    },
  });
};
