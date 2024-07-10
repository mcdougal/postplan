'use client';

import { PlannedPost } from '@/server/plannedPosts';
import NextImage from 'next/image';
import { twMerge } from 'tailwind-merge';

import useFileDownloadUrlRequest from './useFileDownloadUrlRequest';

type Props = {
  bounds: { height: number; width: number; x: number; y: number };
  isAnimating: boolean;
  isDragging: boolean;
  onDragEnd: () => void;
  onDragEnter: () => void;
  onDragStart: () => void;
  plannedPost: PlannedPost;
};

const PlannedFeedItem = ({
  bounds,
  isAnimating,
  isDragging,
  onDragEnd,
  onDragEnter,
  onDragStart,
  plannedPost,
}: Props): React.ReactElement => {
  const { data } = useFileDownloadUrlRequest(plannedPost);

  return (
    <div
      className={twMerge(
        `absolute transition-all`,
        isDragging && `opacity-0`,
        isAnimating && `pointer-events-none`
      )}
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
            onDragEnter();
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
  );
};

export default PlannedFeedItem;
