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
  thumbnailUrlByMediaItemId: Map<string, string>;
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
  thumbnailUrlByMediaItemId,
}: Props): React.ReactElement => {
  const thumbnailUrl = thumbnailUrlByMediaItemId.get(mediaItem.id);
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
          left: `${reorderedBounds.x}px`,
          top: `${reorderedBounds.y}px`,
          width: `${reorderedBounds.width}px`,
        }}>
        <button className="absolute inset-0" onClick={onClick}>
          {thumbnailUrl && (
            <Image
              alt="Planned post thumbnail"
              fill
              src={thumbnailUrl}
              style={{ objectFit: `cover`, objectPosition: `center` }}
              unoptimized
            />
          )}
        </button>
        {onDelete && (
          <div className="absolute right-1 top-1 flex items-center justify-center rounded-full bg-black bg-opacity-30 opacity-0 group-hover:opacity-100">
            <IconButton
              className="text-white"
              icon={XCircleIcon}
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
