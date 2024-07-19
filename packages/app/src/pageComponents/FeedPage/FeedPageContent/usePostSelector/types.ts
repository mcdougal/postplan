import { ActualPost } from '@/server/instagram';
import { PlannedPost } from '@/server/plannedPosts';

export type SelectedPostId =
  | { type: 'actual'; actualPostId: string }
  | { type: 'planned'; plannedPostId: string };

export type SelectedPost =
  | { type: 'actual'; actualPost: ActualPost }
  | { type: 'planned'; plannedPost: PlannedPost };
