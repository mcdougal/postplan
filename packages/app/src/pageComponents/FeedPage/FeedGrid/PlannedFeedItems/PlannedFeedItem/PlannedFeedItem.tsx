'use client';

import { PlannedPost } from '@/server/plannedPosts';
import NextImage from 'next/image';
import { twMerge } from 'tailwind-merge';

import { getItemBounds } from '../../gridPositioning';
import calculateReorderedIndex from '../calculateReorderedIndex';

type Props = {
  downloadUrlByMediaItemId: Map<string, string>;
  draggingIndex: number | null;
  dragOverIndex: number | null;
  onDragEnd: () => void;
  onDragEnter: () => void;
  onDragStart: () => void;
  onDrop: () => void;
  plannedPost: PlannedPost;
  plannedPostIndex: number;
};

const PlannedFeedItem = ({
  downloadUrlByMediaItemId,
  draggingIndex,
  dragOverIndex,
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
  const firstMediaItemDownloadUrl =
    plannedPost.mediaItems.length > 0
      ? downloadUrlByMediaItemId.get(plannedPost.mediaItems[0].id)
      : null;
  const dropZoneActive =
    draggingIndex !== null &&
    (plannedPostIndex !== draggingIndex || dragOverIndex !== null);

  return (
    <>
      <div
        className={twMerge(
          `absolute`,
          draggingIndex !== null && `transition-all`,
          isDragging && `opacity-0`
        )}
        draggable
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        style={{
          height: `${reorderedBounds.height}px`,
          left: `${reorderedBounds.x}px`,
          top: `${reorderedBounds.y}px`,
          width: `${reorderedBounds.width}px`,
        }}>
        {firstMediaItemDownloadUrl && (
          <NextImage
            alt={plannedPost.caption || `Planned post thumbnail`}
            fill
            priority
            sizes="250px"
            src={firstMediaItemDownloadUrl}
            style={{ objectFit: `cover`, objectPosition: `center` }}
            unoptimized
          />
        )}
      </div>
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
