'use client';

import { isReel } from '@/common/plannedPosts';
import { CurrentUser } from '@/common/users';
import { PlannedPost } from '@/server/plannedPosts';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { Dispatch, SetStateAction, useState } from 'react';

import { Dropdown, DropdownItem, IconButton } from '@/app/components';

import CaptionCountdown from './CaptionCountdown';
import DeletePlannedPostConfirmDialog from './DeletePlannedPostConfirmDialog';
import getNumChars from './getNumChars';
import getNumHashtags from './getNumHashtags';
import getNumTags from './getNumTags';
import useDeleteRequest from './useDeleteRequest';
import useUpdateIsReelRequest from './useUpdateIsReelRequest';

type Props = {
  caption: string | null;
  currentUser: CurrentUser;
  onOpenHashtagFinder: () => void;
  plannedPost: PlannedPost;
  setOptimisticPlannedPosts: Dispatch<SetStateAction<Array<PlannedPost>>>;
};

const PlannedPostEditorActions = ({
  caption,
  currentUser,
  onOpenHashtagFinder,
  plannedPost,
  setOptimisticPlannedPosts,
}: Props): React.ReactElement => {
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const { updateIsReel } = useUpdateIsReelRequest(
    currentUser,
    setOptimisticPlannedPosts
  );
  const { deletePlannedPost } = useDeleteRequest(
    currentUser,
    setOptimisticPlannedPosts
  );

  return (
    <>
      <div className="flex h-12 items-center gap-2 bg-white pl-6 pr-3">
        <CaptionCountdown count={getNumHashtags(caption)} label="#" max={30} />
        <CaptionCountdown count={getNumTags(caption)} label="@" max={20} />
        <CaptionCountdown count={getNumChars(caption)} label="Abc" max={2200} />
        <div className="flex flex-1 items-center justify-end">
          <Dropdown
            control={
              <IconButton
                as="menuButton"
                icon={EllipsisVerticalIcon}
                label="Options"
                size="md"
              />
            }>
            <DropdownItem label="Find Hashtags" onClick={onOpenHashtagFinder} />
            <DropdownItem
              label={isReel(plannedPost) ? `Remove Reel Icon` : `Add Reel Icon`}
              onClick={() => {
                updateIsReel(plannedPost.id, !isReel(plannedPost));
              }}
            />
            <DropdownItem label="Download Images" />
            <DropdownItem
              label="Delete"
              onClick={() => {
                setIsDeleteConfirmOpen(true);
              }}
            />
          </Dropdown>
        </div>
      </div>
      <DeletePlannedPostConfirmDialog
        onCancel={() => {
          setIsDeleteConfirmOpen(false);
        }}
        onConfirm={() => {
          deletePlannedPost(plannedPost.id);
          setIsDeleteConfirmOpen(false);
        }}
        open={isDeleteConfirmOpen}
      />
    </>
  );
};

export default PlannedPostEditorActions;
