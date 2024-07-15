import { PlannedPost } from '@/server/plannedPosts';
import { useState } from 'react';

type PlannedPostsSelector = {
  onClickPlannedPost: (
    plannedPost: PlannedPost,
    { multiSelect }: { multiSelect: boolean }
  ) => void;
  onDeselectAllPlannedPosts: () => void;
  selectedPlannedPosts: Array<PlannedPost>;
};

export default (): PlannedPostsSelector => {
  const [selectedPlannedPosts, setSelectedPlannedPosts] = useState<
    Array<PlannedPost>
  >([]);

  const onClickPlannedPost = (
    plannedPost: PlannedPost,
    { multiSelect }: { multiSelect: boolean }
  ): void => {
    const alreadySelected = selectedPlannedPosts.some((selectedPlannedPost) => {
      return selectedPlannedPost.id === plannedPost.id;
    });

    if (alreadySelected) {
      setSelectedPlannedPosts(
        selectedPlannedPosts.filter((selectedPlannedPost) => {
          return selectedPlannedPost.id !== plannedPost.id;
        })
      );
    } else if (!multiSelect) {
      setSelectedPlannedPosts([plannedPost]);
    } else {
      setSelectedPlannedPosts([...selectedPlannedPosts, plannedPost]);
    }
  };

  const onDeselectAllPlannedPosts = (): void => {
    setSelectedPlannedPosts([]);
  };

  return {
    onClickPlannedPost,
    onDeselectAllPlannedPosts,
    selectedPlannedPosts,
  };
};
