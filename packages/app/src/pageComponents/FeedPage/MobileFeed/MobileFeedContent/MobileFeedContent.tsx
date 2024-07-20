'use client';

import { getFirstMediaItem, getMediaItems } from '@/common/plannedPosts';
import { PlannedPost } from '@/server/plannedPosts';
import { ArrowDownTrayIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

import { Button, Typography } from '@/app/components';

type Props = {
  plannedPosts: Array<PlannedPost>;
};

const MobileFeedContent = ({ plannedPosts }: Props): React.ReactElement => {
  return (
    <>
      <div className="p-4">
        <Typography size="md">
          Download images and captions for planned posts. To edit planned posts,
          visit the desktop site.
        </Typography>
      </div>
      {plannedPosts.length === 0 && (
        <div className="px-4 py-10">
          <Typography className="block text-center" color="gray" size="lg">
            You haven’t planned any posts
          </Typography>
        </div>
      )}
      {plannedPosts.map((plannedPost) => {
        const firstMediaItem = getFirstMediaItem(plannedPost);

        return (
          <div key={plannedPost.id} className="mb-10">
            <div className="relative aspect-square w-full">
              {firstMediaItem && (
                <Image
                  alt={plannedPost.caption || `Planned post thumbnail`}
                  fill
                  priority
                  src={firstMediaItem.mediaUrl}
                  style={{ objectFit: `cover`, objectPosition: `center` }}
                  unoptimized
                />
              )}
            </div>
            <div className="flex gap-2 px-4 pb-1 pt-2">
              <Button
                color="secondary"
                onClick={() => {
                  getMediaItems(plannedPost).forEach((mediaItem) => {
                    window.open(`${mediaItem.mediaUrl}&download=`);
                  });
                }}
                size="md"
                startIcon={ArrowDownTrayIcon}>
                {getMediaItems(plannedPost).length > 1
                  ? `Download Images`
                  : `Download Image`}
              </Button>
              {plannedPost.caption && (
                <Button color="secondary" size="md" startIcon={ClipboardIcon}>
                  Copy Caption
                </Button>
              )}
            </div>
            <div className="px-4">
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
      })}
    </>
  );
};

export default MobileFeedContent;
