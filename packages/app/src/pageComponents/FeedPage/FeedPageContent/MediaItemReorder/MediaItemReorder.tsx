'use client';

import { getMediaItems } from '@/common/plannedPosts';
import { CurrentUser } from '@/common/users';
import { PlannedPost } from '@/server/plannedPosts';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { Dispatch, SetStateAction, useState } from 'react';

import { IconButton } from '@/app/components';

import { getContainerSize, getItemBounds } from './mediaItemPositioning';
import MediaItemPreview from './MediaItemPreview';
import useReorderRequest from './useReorderRequest';

type Props = {
  currentUser: CurrentUser;
  plannedPost: PlannedPost;
  setOptimisticPlannedPosts: Dispatch<SetStateAction<Array<PlannedPost>>>;
  thumbnailUrlByMediaItemId: Map<string, string>;
};

const MediaItemReorder = ({
  currentUser,
  plannedPost,
  setOptimisticPlannedPosts,
  thumbnailUrlByMediaItemId,
}: Props): React.ReactElement => {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const mediaItems = getMediaItems(plannedPost);
  const containerSize = getContainerSize({ numItems: mediaItems.length + 1 });
  const addButtonBounds = getItemBounds({ index: mediaItems.length });

  const { reorderMediaItems } = useReorderRequest(
    currentUser,
    plannedPost.id,
    mediaItems,
    setOptimisticPlannedPosts,
    draggingIndex,
    dragOverIndex
  );

  return (
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
              thumbnailUrlByMediaItemId={thumbnailUrlByMediaItemId}
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
            label="Add Image"
            onClick={() => {
              // todo
            }}
            size="2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default MediaItemReorder;
