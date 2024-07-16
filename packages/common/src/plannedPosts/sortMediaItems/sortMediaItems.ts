type MediaItemBase = {
  createdAt: Date;
  order: number | null;
};

export default <T extends MediaItemBase>(mediaItems: Array<T>): Array<T> => {
  return [...mediaItems].sort((a, b) => {
    if (a.order === null && b.order !== null) {
      return 1;
    }

    if (a.order !== null && b.order === null) {
      return -1;
    }

    if (a.order !== null && b.order !== null) {
      return a.order - b.order;
    }

    return a.createdAt.getTime() - b.createdAt.getTime();
  });
};
