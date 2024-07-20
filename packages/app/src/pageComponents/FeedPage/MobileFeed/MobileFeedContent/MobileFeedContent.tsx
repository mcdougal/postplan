'use client';

import { PlannedPost } from '@/server/plannedPosts';

import { Typography } from '@/app/components';

import MobilePlannedPost from './MobilePlannedPost';

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
        return (
          <MobilePlannedPost key={plannedPost.id} plannedPost={plannedPost} />
        );
      })}
    </>
  );
};

export default MobileFeedContent;
