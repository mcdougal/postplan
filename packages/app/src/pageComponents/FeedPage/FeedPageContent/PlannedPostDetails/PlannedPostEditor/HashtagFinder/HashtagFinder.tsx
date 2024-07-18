/* eslint-disable react/no-array-index-key */
'use client';

import { PlannedPost } from '@/server/plannedPosts';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { DialogTitle, IconButton } from '@/app/components';

import applyUpdatesToCaption from './applyUpdatesToCaption';
import HashtagPicker from './HashtagPicker';
import parseHashtags from './parseHashtags';

type Props = {
  onClose: () => void;
  onUpdateCaption: (plannedPostId: string, caption: string) => Promise<void>;
  open: boolean;
  plannedPost: PlannedPost;
};

const HashtagFinder = ({
  onClose,
  onUpdateCaption,
  open,
  plannedPost,
}: Props): React.ReactElement | null => {
  const selectedHashtags = parseHashtags(plannedPost.caption);

  if (!open) {
    return null;
  }

  return (
    <div className="absolute -left-4 top-1/2 w-[520px] -translate-x-full -translate-y-1/2 rounded-lg bg-white p-4 shadow-2xl">
      <div className="mb-4 flex items-center justify-between gap-4">
        <DialogTitle className="flex-1">Find Hashtags</DialogTitle>
        <IconButton
          edge="end"
          icon={XMarkIcon}
          iconStyle="icon"
          label="Close"
          onClick={onClose}
          size="md"
        />
      </div>
      <HashtagPicker
        onUpdateHashtags={(updates) => {
          onUpdateCaption(
            plannedPost.id,
            applyUpdatesToCaption(plannedPost.caption, updates)
          );
        }}
        plannedPost={plannedPost}
        selectedHashtags={new Set(selectedHashtags)}
      />
      <div className="absolute right-0 top-1/2 h-0 w-0 -translate-y-1/2 translate-x-full border-y-8 border-l-[16px] border-y-transparent border-l-white" />
    </div>
  );
};

export default HashtagFinder;
