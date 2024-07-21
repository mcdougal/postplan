import { PlannedPost } from '@/server/plannedPosts';
import { useState } from 'react';

import { Post } from '../types';

import createMediaItemsServerAction from './createMediaItemsServerAction';

type Callbacks = {
  onCompleted: () => void;
};

type CreateMediaItems = (
  plannedPost: PlannedPost,
  posts: Array<Post>
) => Promise<void>;

type CreateMediaItemsRequest = {
  createMediaItems: CreateMediaItems;
  error: string | null;
  loading: boolean;
};

export default ({ onCompleted }: Callbacks): CreateMediaItemsRequest => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createMediaItems: CreateMediaItems = async (plannedPost, posts) => {
    setLoading(true);
    setError(null);

    const mediaItemsData = posts.map((post) => {
      return {
        fileName: post.file.name,
        height: post.resolution.height,
        width: post.resolution.width,
      };
    });

    const response = await createMediaItemsServerAction({
      data: {
        mediaItems: mediaItemsData,
        plannedPostId: plannedPost.id,
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
