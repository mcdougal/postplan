import { ActualPost } from '@/server/instagram';
import { PlannedPost } from '@/server/plannedPosts';
import { useCallback, useEffect, useState } from 'react';

import findSelectedPost from './findSelectedPost';
import { SelectedPost, SelectedPostId } from './types';
import useFirstPostSelectedId from './useFirstPostSelectedId';

type PostSelector = {
  selectedPost: SelectedPost | null;
  selectPost: (selectedPostId: SelectedPostId) => void;
};

export default (
  optimisticPlannedPosts: Array<PlannedPost>,
  actualPosts: Array<ActualPost>
): PostSelector => {
  const firstPostSelectedId = useFirstPostSelectedId(
    optimisticPlannedPosts,
    actualPosts
  );

  const [selectedPostId, setSelectedPostId] = useState<SelectedPostId | null>(
    firstPostSelectedId
  );

  const selectedPost = findSelectedPost(
    selectedPostId,
    optimisticPlannedPosts,
    actualPosts
  );

  const selectPost = useCallback((newSelectedPostId: SelectedPostId): void => {
    setSelectedPostId(newSelectedPostId);
  }, []);

  useEffect(() => {
    if (!selectedPostId || selectedPostId.type === `actual`) {
      return;
    }

    if (selectedPostId.type === `planned`) {
      const selectedExists = optimisticPlannedPosts.some((plannedPost) => {
        return plannedPost.id === selectedPostId.plannedPostId;
      });

      if (!selectedExists) {
        setSelectedPostId(firstPostSelectedId);
      }

      return;
    }

    const exhaustiveCheck: never = selectedPostId;
    return exhaustiveCheck;
  }, [optimisticPlannedPosts, selectedPostId, firstPostSelectedId]);

  return {
    selectedPost,
    selectPost,
  };
};
