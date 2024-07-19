import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

import { Dropdown, DropdownItem, IconButton } from '@/app/components';

import { HashtagGroup } from '../useHashtagGroupsRequest';

import DeleteGroupConfirmDialog from './DeleteGroupConfirmDialog';
import useDeleteGroupRequest from './useDeleteGroupRequest';

type Props = {
  hashtagGroup: HashtagGroup;
  onClickEdit: () => void;
  onGroupDeleted: (deletedGroupId: string) => void;
};

const HashtagGroupActions = ({
  hashtagGroup,
  onClickEdit,
  onGroupDeleted,
}: Props): React.ReactElement => {
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const { deleteHashtagGroup } = useDeleteGroupRequest(() => {
    onGroupDeleted(hashtagGroup.id);
  });

  return (
    <>
      <Dropdown
        control={
          <IconButton
            as="menuButton"
            className="-ml-2"
            edge="start"
            icon={EllipsisVerticalIcon}
            iconStyle="icon"
            label="Options"
            size="sm"
          />
        }>
        <DropdownItem label="Edit Group" onClick={onClickEdit} />
        <DropdownItem
          label="Delete Group"
          onClick={() => {
            setIsDeleteConfirmOpen(true);
          }}
        />
      </Dropdown>
      <DeleteGroupConfirmDialog
        onCancel={() => {
          setIsDeleteConfirmOpen(false);
        }}
        onConfirm={() => {
          deleteHashtagGroup(hashtagGroup.id);
          setIsDeleteConfirmOpen(false);
        }}
        open={isDeleteConfirmOpen}
      />
    </>
  );
};

export default HashtagGroupActions;
