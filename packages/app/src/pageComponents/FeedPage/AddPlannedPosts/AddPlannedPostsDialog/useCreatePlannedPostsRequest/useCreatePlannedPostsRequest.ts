import { CurrentUser } from '@/common/users';
import { useState } from 'react';

import { uploadPlannedPostImageFile } from '@/app/plannedPosts';

import { Post } from '../types';

import createPlannedPostsFormAction from './createPlannedPostsFormAction';

type Callbacks = {
  onCompleted: () => void;
};

type CreatePlannedPostsRequest = {
  createPlannedPosts: () => Promise<void>;
  error: string | null;
  loading: boolean;
};

export default (
  currentUser: CurrentUser,
  posts: Array<Post>,
  { onCompleted }: Callbacks
): CreatePlannedPostsRequest => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createPlannedPosts = async (): Promise<void> => {
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

    const plannedPostsData = posts.map((post) => {
      return {
        fileName: post.file.name,
      };
    });

    const response = await createPlannedPostsFormAction({
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
