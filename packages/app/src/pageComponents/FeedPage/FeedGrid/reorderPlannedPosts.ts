import { PlannedPost } from '@/server/plannedPosts';

export default (
  plannedPosts: Array<PlannedPost>,
  draggedPostId: string,
  dragOverIndex: number
): Array<PlannedPost> => {
  const draggedPost = plannedPosts.find((post) => {
    return post.id === draggedPostId;
  });

  if (!draggedPost) {
    return plannedPosts;
  }

  const reorderedPlannedPosts: Array<PlannedPost> = [];

  plannedPosts.forEach((plannedPost, i) => {
    if (plannedPost.id !== draggedPostId) {
      reorderedPlannedPosts.push(plannedPost);
    }

    if (i === dragOverIndex) {
      reorderedPlannedPosts.push(draggedPost);
    }
  });

  return reorderedPlannedPosts;
};
