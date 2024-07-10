'use client';

import { PlannedPost } from '@/server/plannedPosts';
import NextImage from 'next/image';

import useFileDownloadUrlRequest from './useFileDownloadUrlRequest';

type Props = {
  bounds: { height: number; width: number; x: number; y: number };
  isDragging: boolean;
  onDragEnd: () => void;
  onDragEnter: () => void;
  onDragStart: () => void;
  plannedPost: PlannedPost;
};

const PlannedFeedItem = ({
  bounds,
  isDragging,
  onDragEnd,
  onDragEnter,
  onDragStart,
  plannedPost,
}: Props): React.ReactElement => {
  const { data } = useFileDownloadUrlRequest(plannedPost);

  return (
    <>
      <div
        className="absolute transition-all"
        style={{
          height: `${bounds.height}px`,
          left: `${bounds.x}px`,
          top: `${bounds.y}px`,
          width: `${bounds.width}px`,
        }}>
        {data?.fileDownloadUrl && (
          <NextImage
            alt={plannedPost.caption || `Planned post thumbnail`}
            draggable
            fill
            onDragEnd={() => {
              onDragEnd();
            }}
            onDragEnter={(event) => {
              event.preventDefault();
              if (!isDragging) {
                onDragEnter();
              }
            }}
            onDragOver={(event) => {
              event.preventDefault();
            }}
            onDragStart={() => {
              onDragStart();
            }}
            onDrop={(event) => {
              event.preventDefault();
            }}
            sizes="250px"
            src={data.fileDownloadUrl}
            style={{ objectFit: `cover`, objectPosition: `center` }}
            unoptimized
          />
        )}
      </div>
      {isDragging && (
        <div
          className="pointer-events-none absolute bg-white"
          style={{
            height: `${bounds.height}px`,
            left: `${bounds.x}px`,
            top: `${bounds.y}px`,
            width: `${bounds.width}px`,
          }}
        />
      )}
    </>
  );
};

export default PlannedFeedItem;
