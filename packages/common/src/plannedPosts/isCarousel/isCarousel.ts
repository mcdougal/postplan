type PlannedPost = {
  mediaItems: Array<unknown>;
};

export default (plannedPost: PlannedPost): boolean => {
  return plannedPost.mediaItems.length > 1;
};
