import { InstagramMediaItem } from '@/server/instagram';
import { PlannedPost } from '@/server/plannedPosts';
import { useMemo } from 'react';

import { SelectedPostId } from './types';

export default (
  optimisticPlannedPosts: Array<PlannedPost>,
  actualPosts: Array<InstagramMediaItem>
): SelectedPostId | null => {
  const firstPlannedPostId =
    optimisticPlannedPosts.length > 0 ? optimisticPlannedPosts[0].id : null;
  const firstActualPostId = actualPosts.length > 0 ? actualPosts[0].id : null;

  return useMemo(() => {
    if (firstPlannedPostId) {
      return { type: `planned`, plannedPostId: firstPlannedPostId };
    }
    if (firstActualPostId) {
      return { type: `actual`, actualPostId: firstActualPostId };
    }
    return null;
  }, [firstPlannedPostId, firstActualPostId]);
};
