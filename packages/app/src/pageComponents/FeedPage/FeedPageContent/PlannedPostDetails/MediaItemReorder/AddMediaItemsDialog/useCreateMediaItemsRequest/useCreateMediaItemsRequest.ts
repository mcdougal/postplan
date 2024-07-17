import { CurrentUser } from '@/common/users';
import { useState } from 'react';

import { uploadPlannedPostImageFile } from '@/app/plannedPosts';

import { Post } from '../types';

import createMediaItemsServerAction from './createMediaItemsServerAction';

type Callbacks = {
  onCompleted: () => void;
};

type CreateMediaItemsRequest = {
  createMediaItems: () => Promise<void>;
  error: string | null;
  loading: boolean;
};

export default (
  currentUser: CurrentUser,
  plannedPostId: string,
  posts: Array<Post>,
  { onCompleted }: Callbacks
): CreateMediaItemsRequest => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createMediaItems = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await Promise.all(
        posts.map(async (post) => {
          await uploadPlannedPostImageFile(post.file, currentUser);
        })
      );
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      setLoading(false);
      setError(`Error uploading files`);
      return;
    }

    const mediaItemsData = posts.map((post) => {
      return {
        fileName: post.file.name,
        height: post.resolution.height,
        width: post.resolution.width,
      };
    });

    const response = await createMediaItemsServerAction({
      auth: {
        currentUserId: currentUser.id,
      },
      data: {
        mediaItems: mediaItemsData,
        plannedPostId,
      },
    });

    if (response.status === `error`) {
      setLoading(false);
      setError(response.message);
      return;
    }

    setLoading(false);
    onCompleted();
  };

  return {
    createMediaItems,
    error,
    loading,
  };
};
