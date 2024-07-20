'use client';

import { getMediaItems } from '@/common/plannedPosts';
import { PlannedPost } from '@/server/plannedPosts';
import { ArrowDownTrayIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import { useRef } from 'react';
import { toast } from 'react-hot-toast';

import { Button, Typography } from '@/app/components';

import MobilePlannedPostCarousel from './MobilePlannedPostCarousel';
import useCarousel from './useCarousel';

type Props = {
  plannedPost: PlannedPost;
};

const MobilePlannedPost = ({ plannedPost }: Props): React.ReactElement => {
  const captionRef = useRef<HTMLDivElement>(null);
  const carousel = useCarousel(plannedPost);

  return (
    <div className="mb-10">
      <MobilePlannedPostCarousel
        carousel={carousel}
        plannedPost={plannedPost}
      />
      <div className="flex gap-2 px-4 pb-1 pt-2">
        <Button
          color="secondary"
          onClick={() => {
            const mediaItem = getMediaItems(plannedPost)[carousel.currentIndex];
            if (mediaItem) {
              window.open(`${mediaItem.mediaUrl}&download=`);
            }
          }}
          size="md"
          startIcon={ArrowDownTrayIcon}>
          Download Image
        </Button>
        {plannedPost.caption && (
          <Button
            color="secondary"
            onClick={() => {
              if (captionRef.current) {
                navigator.clipboard.writeText(captionRef.current.innerText);
                toast.success(`Caption copied!`);
              }
            }}
            size="md"
            startIcon={ClipboardIcon}>
            Copy Caption
          </Button>
        )}
      </div>
      <div ref={captionRef} className="px-4">
        {plannedPost.caption ? (
          <Typography
            className="break-anywhere mt-2 whitespace-pre-wrap"
            size="xs">
            {plannedPost.caption}
          </Typography>
        ) : (
          <Typography className="mt-2" color="gray" size="xs">
            No Caption
          </Typography>
        )}
      </div>
    </div>
  );
};

export default MobilePlannedPost;
