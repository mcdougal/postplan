'use client';

import { getFirstMediaItem } from '@/common/plannedPosts';
import { PlannedPost } from '@/server/plannedPosts';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import { getItemBounds } from '../../gridPositioning';
import calculateReorderedIndex from '../calculateReorderedIndex';

import getTypeIcon from './getTypeIcon';

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
  const dropZoneActive =
    draggingIndex !== null &&
    (plannedPostIndex !== draggingIndex || dragOverIndex !== null);

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const TypeIcon = getTypeIcon(plannedPost);

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
        {firstMediaItem && (
          <Image
            alt={plannedPost.caption || `Planned post thumbnail`}
            fill
            priority
            src={firstMediaItem.mediaThumbnailUrl}
            style={{ objectFit: `cover`, objectPosition: `center` }}
            unoptimized
          />
        )}
        {TypeIcon && <TypeIcon className="absolute right-2 top-2 h-4 w-4" />}
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
