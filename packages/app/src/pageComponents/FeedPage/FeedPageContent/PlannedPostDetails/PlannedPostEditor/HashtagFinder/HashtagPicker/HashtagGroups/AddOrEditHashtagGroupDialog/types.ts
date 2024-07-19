import { HashtagGroup } from '../useHashtagGroupsRequest';

export type AddOrEditDialogAction =
  | { status: `add` }
  | { status: `edit`; group: HashtagGroup };
