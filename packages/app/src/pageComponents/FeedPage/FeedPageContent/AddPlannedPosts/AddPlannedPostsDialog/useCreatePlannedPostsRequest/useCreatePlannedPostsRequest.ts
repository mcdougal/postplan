import { CurrentUser } from '@/common/users';
import { useState } from 'react';

import { Post } from '../types';

import createPlannedPostsServerAction from './createPlannedPostsServerAction';

type Callbacks = {
  onCompleted: () => void;
};

type CreatePlannedPosts = (options: {
  isCarousel: boolean;
  isReel: boolean;
}) => Promise<void>;

type CreatePlannedPostsRequest = {
  createPlannedPosts: CreatePlannedPosts;
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

  const createPlannedPosts: CreatePlannedPosts = async ({
    isCarousel,
    isReel,
  }): Promise<void> => {
    setLoading(true);
    setError(null);

    const plannedPostsData = isCarousel
      ? [
          {
            files: posts.map((post) => {
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
            files: [
              {
                fileName: post.file.name,
                height: post.resolution.height,
                width: post.resolution.width,
              },
            ],
          };
        });

    const formData = new FormData();
    formData.append(
      `data`,
      JSON.stringify({
        isReel,
        plannedPosts: plannedPostsData,
        userId: currentUser.id,
      })
    );

    posts.forEach((post) => {
      formData.append(post.file.name, post.file);
    });

    const response = await createPlannedPostsServerAction({
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
    createPlannedPosts,
    error,
    loading,
  };
};
