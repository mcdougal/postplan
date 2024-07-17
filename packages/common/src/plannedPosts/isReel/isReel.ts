type PlannedPost = {
  isReel: boolean | null;
};

export default (plannedPost: PlannedPost): boolean => {
  return plannedPost.isReel ?? false;
};
