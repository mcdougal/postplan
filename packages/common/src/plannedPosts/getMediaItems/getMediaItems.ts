type MediaItemBase = {
  createdAt: Date;
  order: number | null;
};

type PlannedPost<T> = {
  mediaItems: Array<T>;
};

export default <T extends MediaItemBase>(
  plannedPost: PlannedPost<T>
): Array<T> => {
  return [...plannedPost.mediaItems].sort((a, b) => {
    if (a.order === null && b.order !== null) {
      return -1;
    }

    if (a.order !== null && b.order === null) {
      return 1;
    }

    if (a.order !== null && b.order !== null) {
      return a.order - b.order;
    }

    return b.createdAt.getTime() - a.createdAt.getTime();
  });
};
