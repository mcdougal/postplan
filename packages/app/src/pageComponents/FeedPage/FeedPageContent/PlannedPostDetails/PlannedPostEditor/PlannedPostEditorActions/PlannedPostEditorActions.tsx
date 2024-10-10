'use client';

import { getMediaItems } from '@/common/plannedPosts';
import { PlannedPost } from '@/server/plannedPosts';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { Dispatch, SetStateAction, useState } from 'react';

import { Dropdown, DropdownItem, IconButton } from '@/app/components';

import { Carousel } from '../../useCarousel';

import CaptionCountdown from './CaptionCountdown';
import DeletePlannedPostConfirmDialog from './DeletePlannedPostConfirmDialog';
import getNumChars from './getNumChars';
import getNumHashtags from './getNumHashtags';
import getNumTags from './getNumTags';
import useDeleteRequest from './useDeleteRequest';

type Props = {
  carousel: Carousel;
  onOpenHashtagFinder: () => void;
  plannedPost: PlannedPost;
  setOptimisticPlannedPosts: Dispatch<SetStateAction<Array<PlannedPost>>>;
};

const PlannedPostEditorActions = ({
  carousel,
  onOpenHashtagFinder,
  plannedPost,
  setOptimisticPlannedPosts,
}: Props): React.ReactElement => {
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const { deletePlannedPost } = useDeleteRequest(setOptimisticPlannedPosts);
  const { caption } = plannedPost;

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
                iconStyle="icon"
                label="Options"
                size="md"
              />
            }>
            <DropdownItem label="Add Hashtags" onClick={onOpenHashtagFinder} />
            <DropdownItem
              label="Download Image"
              onClick={() => {
                const mediaItem =
                  getMediaItems(plannedPost)[carousel.currentIndex];
                if (mediaItem) {
                  window.open(`${mediaItem.mediaUrl}&download=`);
                }
              }}
            />
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
