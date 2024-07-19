'use client';

import { getMediaItems } from '@/common/plannedPosts';
import { CurrentUser } from '@/common/users';
import { PlannedPost } from '@/server/plannedPosts';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { Dispatch, SetStateAction, useState } from 'react';

import { IconButton } from '@/app/components';

import { Carousel } from '../useCarousel';

import AddMediaItemsDialog from './AddMediaItemsDialog';
import { getContainerSize, getItemBounds } from './mediaItemPositioning';
import MediaItemPreview from './MediaItemPreview';
import useDeleteRequest from './useDeleteRequest';
import useReorderRequest from './useReorderRequest';

type Props = {
  carousel: Carousel;
  currentUser: CurrentUser;
  plannedPost: PlannedPost;
  setOptimisticPlannedPosts: Dispatch<SetStateAction<Array<PlannedPost>>>;
};

const MediaItemReorder = ({
  carousel,
  currentUser,
  plannedPost,
  setOptimisticPlannedPosts,
}: Props): React.ReactElement => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const mediaItems = getMediaItems(plannedPost);
  const containerSize = getContainerSize({ numItems: mediaItems.length + 1 });
  const addButtonBounds = getItemBounds({ index: mediaItems.length });

  const { reorderMediaItems } = useReorderRequest(
    plannedPost.id,
    mediaItems,
    setOptimisticPlannedPosts,
    draggingIndex,
    dragOverIndex
  );

  const { deleteMediaItem } = useDeleteRequest(
    plannedPost.id,
    setOptimisticPlannedPosts
  );

  return (
    <>
      <div className="overflow-x-auto">
        <div
          className="relative"
          style={{ height: containerSize.height, width: containerSize.width }}>
          {mediaItems.map((mediaItem, i) => {
            return (
              <MediaItemPreview
                key={mediaItem.id}
                draggingIndex={draggingIndex}
                dragOverIndex={dragOverIndex}
                mediaItem={mediaItem}
                mediaItemIndex={i}
                onClick={() => {
                  carousel.jump(i);
                }}
                onDelete={
                  mediaItems.length > 1
                    ? (): void => {
                        deleteMediaItem(mediaItem.id);
                      }
                    : null
                }
                onDragEnd={() => {
                  setDraggingIndex(null);
                  setDragOverIndex(null);
                }}
                onDragEnter={() => {
                  setDragOverIndex(i);
                }}
                onDragStart={() => {
                  setDraggingIndex(i);
                }}
                onDrop={() => {
                  reorderMediaItems();
                }}
              />
            );
          })}
          <div
            className="absolute flex items-center justify-center"
            style={{
              height: `${addButtonBounds.height}px`,
              left: `${addButtonBounds.x}px`,
              top: `${addButtonBounds.y}px`,
              width: `${addButtonBounds.width}px`,
            }}>
            <IconButton
              className="text-white opacity-80"
              icon={PlusCircleIcon}
              iconStyle="circle"
              label="Add To Carousel"
              onClick={() => {
                setAddDialogOpen(true);
              }}
              size="2xl"
            />
          </div>
        </div>
      </div>
      <AddMediaItemsDialog
        currentUser={currentUser}
        onClose={() => {
          setAddDialogOpen(false);
        }}
        open={addDialogOpen}
        plannedPostId={plannedPost.id}
      />
    </>
  );
};

export default MediaItemReorder;
