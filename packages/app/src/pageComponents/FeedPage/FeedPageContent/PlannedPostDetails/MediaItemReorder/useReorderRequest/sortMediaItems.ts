import { PlannedPost } from '@/server/plannedPosts';

import calculateReorderedIndex from '../calculateReorderedIndex';

type MediaItem = PlannedPost['mediaItems'][number];

export default (
  mediaItems: Array<MediaItem>,
  draggingIndex: number | null,
  dragOverIndex: number | null
): Array<MediaItem> => {
  return [...mediaItems].sort((a, b) => {
    const reorderedIndexA = calculateReorderedIndex(
      mediaItems.indexOf(a),
      draggingIndex,
      dragOverIndex
    );
    const reorderedIndexB = calculateReorderedIndex(
      mediaItems.indexOf(b),
      draggingIndex,
      dragOverIndex
    );

    return reorderedIndexA - reorderedIndexB;
  });
};
