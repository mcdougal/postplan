/* eslint-disable react/no-array-index-key */
'use client';

import { PlannedPost } from '@/server/plannedPosts';

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from '@/app/components';

import HashtagPicker from './HashtagPicker';
import parseHashtags from './parseHashtags';

type Props = {
  onClose: () => void;
  open: boolean;
  plannedPost: PlannedPost;
};

const HashtagManager = ({
  onClose,
  open,
  plannedPost,
}: Props): React.ReactElement => {
  const selectedHashtags = parseHashtags(plannedPost.caption);
  const max = 30;
  const remaining = max - selectedHashtags.length;

  return (
    <Dialog maxWidth="3xl" onClose={onClose} open={open}>
      <div className="mb-4 flex items-center gap-4">
        <DialogTitle className="flex-1">Hashtags</DialogTitle>
        <Typography color={remaining < 0 ? `red` : `gray`} size="md">
          {remaining}/{max}
        </Typography>
      </div>
      <div className="mb-5 flex flex-wrap gap-1">
        {selectedHashtags.map((hashtag, i) => {
          return (
            <div
              key={`${hashtag}-${i}`}
              className="rounded-md border border-gray-300 px-1">
              <Typography className="leading-3" size="xs">
                {hashtag}
              </Typography>
            </div>
          );
        })}
      </div>
      <HashtagPicker
        plannedPost={plannedPost}
        selectedHashtags={new Set(selectedHashtags)}
      />
      <DialogActions className="mt-8">
        <Button color="secondary" onClick={onClose} size="lg">
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HashtagManager;
