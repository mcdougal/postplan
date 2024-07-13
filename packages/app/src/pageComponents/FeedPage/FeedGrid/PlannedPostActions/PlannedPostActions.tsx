import { PlannedPost } from '@/server/plannedPosts';
import {
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

import { Button } from '@/app/components';

type Props = {
  selectedPlannedPosts: Array<PlannedPost>;
};

const PlannedPostActions = ({
  selectedPlannedPosts,
}: Props): React.ReactElement => {
  const actions = [
    {
      icon: PencilSquareIcon,
      label: `Edit`,
    },
    {
      icon: TrashIcon,
      label: `Remove`,
    },
    {
      icon: XMarkIcon,
      label: `Cancel`,
    },
  ];

  return (
    <div className="absolute -right-3 top-12 flex translate-x-full flex-col gap-2">
      {actions.map((action) => {
        return (
          <Button
            key={action.label}
            color="secondary"
            size="lg"
            startIcon={action.icon}>
            <div className="min-w-14 text-left">{action.label}</div>
          </Button>
        );
      })}
    </div>
  );
};

export default PlannedPostActions;
