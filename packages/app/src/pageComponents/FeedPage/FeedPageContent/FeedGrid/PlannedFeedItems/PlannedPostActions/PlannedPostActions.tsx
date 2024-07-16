import { PlannedPost } from '@/server/plannedPosts';
import {
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

import { getItemBounds } from '../../gridPositioning';

import PlannedPostAction from './PlannedPostAction';

type Props = {
  allPlannedPosts: Array<PlannedPost>;
  onDelete: (plannedPosts: Array<PlannedPost>) => void;
  onDeselectAll: () => void;
  selectedPlannedPosts: Array<PlannedPost>;
};

// todo - delete

const PlannedPostActions = ({
  allPlannedPosts,
  onDelete,
  onDeselectAll,
  selectedPlannedPosts,
}: Props): React.ReactElement => {
  const firstPostIndex = allPlannedPosts.findIndex((post) => {
    return post.id === selectedPlannedPosts[0].id;
  });

  const firstPostBounds = getItemBounds({ index: firstPostIndex || 0 });

  return (
    <div
      className="absolute -right-3 flex -translate-y-1/2 translate-x-full flex-col gap-2"
      style={{
        top: `${48 + firstPostBounds.y + firstPostBounds.height / 2}px`,
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
          onDelete(selectedPlannedPosts);
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
