'use client';

import { PlannedPost } from '@/server/plannedPosts';

import { Container, Typography } from '@/app/components';

import MobilePlannedPost from './MobilePlannedPost';

type Props = {
  plannedPosts: Array<PlannedPost>;
};

const MobileFeedContent = ({ plannedPosts }: Props): React.ReactElement => {
  return (
    <Container size="xs">
      {plannedPosts.length === 0 ? (
        <div className="px-4 py-10">
          <Typography className="block text-center" color="gray" size="lg">
            You haven’t planned any posts. Open Postplan on your desktop to add
            planned posts.
          </Typography>
        </div>
      ) : (
        <div className="pt-4">
          {plannedPosts.map((plannedPost) => {
            return (
              <MobilePlannedPost
                key={plannedPost.id}
                plannedPost={plannedPost}
              />
            );
          })}
          <div className="border-t-2 border-gray-300 px-4 pb-10 pt-6">
            <Typography size="md">
              No more posts planned. Open Postplan on your desktop to add and
              edit planned posts.
            </Typography>
          </div>
        </div>
      )}
    </Container>
  );
};

export default MobileFeedContent;
