import { PlannedPost } from '@/server/plannedPosts';
import { useEffect, useState } from 'react';

type PlannedPostsSelector = {
  onSelectPlannedPost: (plannedPost: PlannedPost) => void;
  selectedPlannedPost: PlannedPost | null;
};

export default (
  optimisticPlannedPosts: Array<PlannedPost>
): PlannedPostsSelector => {
  const [selectedPlannedPost, setSelectedPlannedPost] = useState(
    optimisticPlannedPosts.length > 0 ? optimisticPlannedPosts[0] : null
  );

  const onSelectPlannedPost = (plannedPost: PlannedPost): void => {
    setSelectedPlannedPost(plannedPost);
  };

  useEffect(() => {
    if (!selectedPlannedPost || optimisticPlannedPosts.length === 0) {
      return;
    }

    const selectedExists = optimisticPlannedPosts.some((plannedPost) => {
      return plannedPost.id === selectedPlannedPost.id;
    });

    if (!selectedExists) {
      setSelectedPlannedPost(optimisticPlannedPosts[0]);
    }
  }, [optimisticPlannedPosts, selectedPlannedPost]);

  return {
    onSelectPlannedPost,
    selectedPlannedPost,
  };
};
