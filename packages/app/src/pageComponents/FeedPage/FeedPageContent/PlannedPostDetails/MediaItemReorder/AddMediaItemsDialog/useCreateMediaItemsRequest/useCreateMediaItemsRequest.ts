import { CurrentUser } from '@/common/users';
import { PlannedPost } from '@/server/plannedPosts';
import { useState } from 'react';

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
  plannedPost: PlannedPost,
  posts: Array<Post>,
  { onCompleted }: Callbacks
): CreateMediaItemsRequest => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createMediaItems = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    const mediaItemsData = posts.map((post) => {
      return {
        fileName: post.file.name,
        height: post.resolution.height,
        width: post.resolution.width,
      };
    });

    const formData = new FormData();
    formData.append(
      `data`,
      JSON.stringify({
        mediaItems: mediaItemsData,
        plannedPostId: plannedPost.id,
        userId: plannedPost.userId,
      })
    );

    posts.forEach((post) => {
      formData.append(post.file.name, post.file);
    });

    const response = await createMediaItemsServerAction({
      data: formData,
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
