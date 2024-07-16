'use client';

import { getFirstMediaItem, isCarousel } from '@/common/plannedPosts';
import { PlannedPost } from '@/server/plannedPosts';
import { Square2StackIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import { getItemBounds } from '../../gridPositioning';
import calculateReorderedIndex from '../calculateReorderedIndex';

type Props = {
  draggingIndex: number | null;
  dragOverIndex: number | null;
  onClick: () => void;
  onDragEnd: () => void;
  onDragEnter: () => void;
  onDragStart: () => void;
  onDrop: () => void;
  plannedPost: PlannedPost;
  plannedPostIndex: number;
  thumbnailUrlByMediaItemId: Map<string, string>;
};

const PlannedFeedItem = ({
  draggingIndex,
  dragOverIndex,
  onClick,
  onDragEnd,
  onDragEnter,
  onDragStart,
  onDrop,
  plannedPost,
  plannedPostIndex,
  thumbnailUrlByMediaItemId,
}: Props): React.ReactElement => {
  const bounds = getItemBounds({ index: plannedPostIndex });
  const reorderedIndex = calculateReorderedIndex(
    plannedPostIndex,
    draggingIndex,
    dragOverIndex
  );
  const reorderedBounds = getItemBounds({ index: reorderedIndex });
  const isDragging = draggingIndex === plannedPostIndex;
  const firstMediaItem = getFirstMediaItem(plannedPost);
  const firstMediaItemThumbnailUrl = firstMediaItem
    ? thumbnailUrlByMediaItemId.get(firstMediaItem.id)
    : null;
  const dropZoneActive =
    draggingIndex !== null &&
    (plannedPostIndex !== draggingIndex || dragOverIndex !== null);

  return (
    <>
      <button
        className={twMerge(
          `absolute`,
          draggingIndex !== null && `transition-all`,
          isDragging && `opacity-0`
        )}
        draggable
        onClick={onClick}
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        style={{
          height: `${reorderedBounds.height}px`,
          left: `${reorderedBounds.x}px`,
          top: `${reorderedBounds.y}px`,
          width: `${reorderedBounds.width}px`,
        }}>
        {firstMediaItemThumbnailUrl && (
          <Image
            alt={plannedPost.caption || `Planned post thumbnail`}
            fill
            priority
            src={firstMediaItemThumbnailUrl}
            style={{ objectFit: `cover`, objectPosition: `center` }}
            unoptimized
          />
        )}
        {isCarousel(plannedPost) && (
          <Square2StackIcon className="absolute right-1 top-1 h-5 w-5 rotate-180 text-white opacity-80" />
        )}
      </button>
      {dropZoneActive && (
        <div
          className="absolute"
          onDragEnter={(event) => {
            event.preventDefault();
            onDragEnter();
          }}
          onDragOver={(event) => {
            event.preventDefault();
          }}
          onDrop={(event) => {
            event.preventDefault();
            onDrop();
          }}
          style={{
            height: `${bounds.height}px`,
            left: `${bounds.x}px`,
            top: `${bounds.y}px`,
            width: `${bounds.width}px`,
            zIndex: 1,
          }}
        />
      )}
    </>
  );
};

export default PlannedFeedItem;
