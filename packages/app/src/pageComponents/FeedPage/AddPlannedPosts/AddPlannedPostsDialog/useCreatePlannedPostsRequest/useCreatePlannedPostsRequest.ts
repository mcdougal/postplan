import { CurrentUser } from '@/common/users';
import { useState } from 'react';

import { uploadPlannedPostImageFile } from '@/app/plannedPosts';

import { Post } from '../types';

import createPlannedPostsServerAction from './createPlannedPostsServerAction';

type Callbacks = {
  onCompleted: () => void;
};

type CreatePlannedPostsRequest = {
  createPlannedPosts: (options: { isCarousel: boolean }) => Promise<void>;
  error: string | null;
  loading: boolean;
};

export default (
  currentUser: CurrentUser,
  posts: Array<Post>,
  { onCompleted }: Callbacks
): CreatePlannedPostsRequest => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPlannedPosts = async (options: {
    isCarousel: boolean;
  }): Promise<void> => {
    const { isCarousel } = options;

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

    const plannedPostsData = isCarousel
      ? [
          {
            mediaItems: posts.map((post) => {
              return {
                fileName: post.file.name,
                height: post.resolution.height,
                width: post.resolution.width,
              };
            }),
          },
        ]
      : posts.map((post) => {
          return {
            mediaItems: [
              {
                fileName: post.file.name,
                height: post.resolution.height,
                width: post.resolution.width,
              },
            ],
          };
        });

    const response = await createPlannedPostsServerAction({
      auth: {
        currentUserId: currentUser.id,
      },
      data: {
        plannedPosts: plannedPostsData,
        userId: currentUser.id,
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
    createPlannedPosts,
    error,
    loading,
  };
};
