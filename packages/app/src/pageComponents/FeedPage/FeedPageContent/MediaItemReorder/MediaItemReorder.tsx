'use client';

import { getMediaItems } from '@/common/plannedPosts';
import { PlannedPost } from '@/server/plannedPosts';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

import { IconButton } from '@/app/components';

import { getContainerSize, getItemBounds } from './mediaItemPositioning';
import MediaItemPreview from './MediaItemPreview';

type Props = {
  thumbnailUrlByMediaItemId: Map<string, string>;
  plannedPost: PlannedPost;
};

const MediaItemReorder = ({
  plannedPost,
  thumbnailUrlByMediaItemId,
}: Props): React.ReactElement => {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const mediaItems = getMediaItems(plannedPost);
  const containerSize = getContainerSize({ numItems: mediaItems.length + 1 });
  const addButtonBounds = getItemBounds({ index: mediaItems.length });

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
                // todo
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
