import { PlannedPost } from '@/server/plannedPosts';
import {
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

import { getItemBounds } from '../gridPositioning';

import PlannedPostAction from './PlannedPostAction';

type Props = {
  allPlannedPosts: Array<PlannedPost>;
  onDeselectAll: () => void;
  selectedPlannedPosts: Array<PlannedPost>;
};

const PlannedPostActions = ({
  allPlannedPosts,
  onDeselectAll,
  selectedPlannedPosts,
}: Props): React.ReactElement => {
  const firstPostIndex = allPlannedPosts.findIndex((post) => {
    return post.id === selectedPlannedPosts[0].id;
  });

  const firstPostBounds = getItemBounds({ index: firstPostIndex || 0 });

  return (
    <div
      className="absolute -right-3 flex translate-x-full flex-col gap-2"
      style={{
        top: `${firstPostBounds.y + 48}px`,
      }}>
      {selectedPlannedPosts.length === 1 && (
        <PlannedPostAction
          icon={PencilSquareIcon}
          label="Edit"
          onClick={() => {
            //
          }}
        />
      )}
      <PlannedPostAction
        icon={TrashIcon}
        label={
          selectedPlannedPosts.length > 1
            ? `Remove ${selectedPlannedPosts.length}`
            : `Remove`
        }
        onClick={() => {
          //
        }}
      />
      <PlannedPostAction
        icon={XMarkIcon}
        label="Cancel"
        onClick={onDeselectAll}
      />
    </div>
  );
};

export default PlannedPostActions;
