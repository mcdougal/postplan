import { CurrentUser } from '@/common/users';
import { useState } from 'react';

import { Post } from '../types';

import createPlannedPostsServerAction from './createPlannedPostsServerAction';

type Callbacks = {
  onCompleted: () => void;
};

type CreatePlannedPosts = (
  currentUser: CurrentUser,
  posts: Array<Post>,
  options: {
    isCarousel: boolean;
    isReel: boolean;
  }
) => Promise<void>;

type CreatePlannedPostsRequest = {
  createPlannedPosts: CreatePlannedPosts;
  error: string | null;
  loading: boolean;
};

export default ({ onCompleted }: Callbacks): CreatePlannedPostsRequest => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPlannedPosts: CreatePlannedPosts = async (
    currentUser,
    posts,
    { isCarousel, isReel }
  ): Promise<void> => {
    setLoading(true);
    setError(null);

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
      data: {
        isReel,
        plannedPosts: plannedPostsData,
        userId: currentUser.id,
      },
    });

    setLoading(false);

    if (response.status === `error`) {
      setError(response.message);
      return;
    }

    onCompleted();
  };

  return {
    createPlannedPosts,
    error,
    loading,
  };
};
