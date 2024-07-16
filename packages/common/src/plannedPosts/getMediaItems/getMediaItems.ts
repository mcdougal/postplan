import sortMediaItems from '../sortMediaItems';

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
  return sortMediaItems(plannedPost.mediaItems);
};
