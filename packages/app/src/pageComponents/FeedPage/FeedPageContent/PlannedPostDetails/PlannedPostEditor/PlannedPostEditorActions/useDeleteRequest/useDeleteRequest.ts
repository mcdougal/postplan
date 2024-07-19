import { PlannedPost } from '@/server/plannedPosts';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-hot-toast';

import deletePlannedPostServerAction from './deletePlannedPostServerAction';

type Request = {
  deletePlannedPost: (id: string) => Promise<void>;
};

export default (
  setOptimisticPlannedPosts: Dispatch<SetStateAction<Array<PlannedPost>>>
): Request => {
  const deletePlannedPost = async (id: string): Promise<void> => {
    setOptimisticPlannedPosts((prevPlannedPosts) => {
      return prevPlannedPosts.filter((plannedPost) => {
        return plannedPost.id !== id;
      });
    });

    const response = await deletePlannedPostServerAction({
      data: { id },
    });

    if (response.status === `error`) {
      toast.error(response.message);
    }
  };

  return {
    deletePlannedPost,
  };
};
