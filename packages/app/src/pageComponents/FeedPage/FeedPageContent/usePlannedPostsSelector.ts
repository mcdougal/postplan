import { PlannedPost } from '@/server/plannedPosts';
import { useEffect, useState } from 'react';

type PlannedPostsSelector = {
  onSelectPlannedPost: (plannedPost: PlannedPost) => void;
  selectedPlannedPost: PlannedPost | null;
};

export default (
  optimisticPlannedPosts: Array<PlannedPost>
): PlannedPostsSelector => {
  const [selectedPlannedPostId, setSelectedPlannedPostId] = useState(
    optimisticPlannedPosts.length > 0 ? optimisticPlannedPosts[0].id : null
  );

  const onSelectPlannedPost = (plannedPost: PlannedPost): void => {
    setSelectedPlannedPostId(plannedPost.id);
  };

  useEffect(() => {
    if (!selectedPlannedPostId || optimisticPlannedPosts.length === 0) {
      return;
    }

    const selectedExists = optimisticPlannedPosts.some((plannedPost) => {
      return plannedPost.id === selectedPlannedPostId;
    });

    if (!selectedExists) {
      setSelectedPlannedPostId(optimisticPlannedPosts[0].id);
    }
  }, [optimisticPlannedPosts, selectedPlannedPostId]);

  const selectedPlannedPost = optimisticPlannedPosts.find((plannedPost) => {
    return plannedPost.id === selectedPlannedPostId;
  });

  return {
    onSelectPlannedPost,
    selectedPlannedPost: selectedPlannedPost || null,
  };
};
