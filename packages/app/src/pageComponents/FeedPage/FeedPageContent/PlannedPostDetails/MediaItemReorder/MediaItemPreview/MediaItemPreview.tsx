import { PlannedPost } from '@/server/plannedPosts';
import { XCircleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import { IconButton } from '@/app/components';

import calculateReorderedIndex from '../calculateReorderedIndex';
import { getItemBounds } from '../mediaItemPositioning';

type MediaItem = PlannedPost['mediaItems'][number];

type Props = {
  draggingIndex: number | null;
  dragOverIndex: number | null;
  mediaItem: MediaItem;
  mediaItemIndex: number;
  onClick: () => void;
  onDelete: (() => void) | null;
  onDragEnd: () => void;
  onDragEnter: () => void;
  onDragStart: () => void;
  onDrop: () => void;
};

const MediaItemPreview = ({
  draggingIndex,
  dragOverIndex,
  mediaItem,
  mediaItemIndex,
  onClick,
  onDelete,
  onDragEnd,
  onDragEnter,
  onDragStart,
  onDrop,
}: Props): React.ReactElement => {
  const bounds = getItemBounds({ index: mediaItemIndex });
  const reorderedIndex = calculateReorderedIndex(
    mediaItemIndex,
    draggingIndex,
    dragOverIndex
  );
  const reorderedBounds = getItemBounds({ index: reorderedIndex });
  const isDragging = draggingIndex === mediaItemIndex;
  const dropZoneActive =
    draggingIndex !== null &&
    (mediaItemIndex !== draggingIndex || dragOverIndex !== null);

  return (
    <>
      <div
        key={mediaItem.id}
        className={twMerge(
          `group absolute overflow-hidden rounded-md`,
          draggingIndex !== null && `transition-all`,
          isDragging && `opacity-0`
        )}
        draggable
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        style={{
          height: `${reorderedBounds.height}px`,
          transform: `translate(${reorderedBounds.x}px, ${reorderedBounds.y}px)`,
          width: `${reorderedBounds.width}px`,
        }}>
        <button className="absolute inset-0" onClick={onClick}>
          <Image
            alt="Planned post thumbnail"
            fill
            src={mediaItem.mediaThumbnailUrl}
            style={{ objectFit: `cover`, objectPosition: `center` }}
            unoptimized
          />
        </button>
        {onDelete && (
          <div className="absolute right-0 top-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 bg-black opacity-50" />
            <IconButton
              className="z-10 text-white shadow-sm"
              icon={XCircleIcon}
              iconStyle="circle"
              label="Remove"
              onClick={onDelete}
              size="lg"
            />
          </div>
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

export default MediaItemPreview;
