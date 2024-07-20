'use client';

import { CurrentUser } from '@/common/users';
import { useState } from 'react';

import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from '@/app/components';

import DragAndDrop from './DragAndDrop';
import getClientErrorMessage from './getClientErrorMessage';
import { Post } from './types';
import useCreatePlannedPostsRequest from './useCreatePlannedPostsRequest';

type Props = {
  currentUser: CurrentUser;
  onClose: () => void;
  open: boolean;
};

const AddPlannedPostsDialog = ({
  currentUser,
  onClose,
  open,
}: Props): React.ReactElement => {
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [isCarousel, setIsCarousel] = useState(false);
  const [isReel, setIsReel] = useState(false);

  const createPlannedPostsRequest = useCreatePlannedPostsRequest(
    currentUser,
    posts,
    {
      onCompleted: () => {
        onClose();
        setTimeout(() => {
          setPosts([]);
          setIsCarousel(false);
          setIsReel(false);
        }, 1000);
      },
    }
  );

  const clientErrorMessage = getClientErrorMessage(posts, isReel);
  const serverErrorMessage = createPlannedPostsRequest.error;

  return (
    <Dialog maxWidth="2xl" onClose={onClose} open={open}>
      <div className="mb-5 flex items-center gap-4">
        <DialogTitle className="flex-1">Plan Posts</DialogTitle>
        <Checkbox
          checked={isReel}
          label="Reel"
          onChange={(event) => {
            event.currentTarget.blur();
            setIsReel(!isReel);
            setIsCarousel(false);
          }}
          size="md"
        />
        <Checkbox
          checked={isCarousel}
          label="Carousel"
          onChange={(event) => {
            event.currentTarget.blur();
            setIsCarousel(!isCarousel);
            setIsReel(false);
          }}
          size="md"
        />
      </div>
      <DragAndDrop onPostsChange={setPosts} posts={posts} />
      <DialogActions className="mt-6">
        {(clientErrorMessage || serverErrorMessage) && (
          <Typography color="red" size="md">
            {clientErrorMessage || serverErrorMessage}
          </Typography>
        )}
        <Button
          color="secondary"
          onClick={() => {
            onClose();
          }}
          size="xl">
          Cancel
        </Button>
        {posts.length > 0 && (
          <Button
            disabled={Boolean(clientErrorMessage)}
            loading={createPlannedPostsRequest.loading}
            onClick={() => {
              createPlannedPostsRequest.createPlannedPosts({
                isCarousel,
                isReel,
              });
            }}
            size="xl">
            {isCarousel ? `Add` : `Add ${posts.length}`}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AddPlannedPostsDialog;
