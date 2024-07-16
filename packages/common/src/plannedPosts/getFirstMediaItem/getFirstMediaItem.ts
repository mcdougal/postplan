import getMediaItems from '../getMediaItems';

type MediaItemBase = {
  createdAt: Date;
  order: number | null;
};

type PlannedPost<T> = {
  mediaItems: Array<T>;
};

export default <T extends MediaItemBase>(
  plannedPost: PlannedPost<T>
): T | null => {
  const mediaItems = getMediaItems(plannedPost);

  if (mediaItems.length === 0) {
    return null;
  }

  return mediaItems[0];
};
