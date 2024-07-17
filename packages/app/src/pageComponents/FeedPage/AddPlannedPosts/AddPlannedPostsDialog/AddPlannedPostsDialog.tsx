'use client';

import { CurrentUser } from '@/common/users';
import { useState } from 'react';

import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  Typography,
} from '@/app/components';

import DragAndDrop from './DragAndDrop';
import postIsNotImage from './postIsNotImage';
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

  const hasNonImageFile = posts.some(postIsNotImage);
  const errorMessage = hasNonImageFile
    ? `Only image files are allowed`
    : createPlannedPostsRequest.error;

  return (
    <Dialog maxWidth="2xl" onClose={onClose} open={open}>
      <div className="mb-5 flex gap-4">
        <Typography className="flex-1" size="xl" weight="bold">
          Add Posts
        </Typography>
        <Checkbox
          checked={isReel}
          label={<Typography size="md">Reel</Typography>}
          onChange={() => {
            setIsReel(!isReel);
            setIsCarousel(false);
          }}
        />
        <Checkbox
          checked={isCarousel}
          label={<Typography size="md">Carousel</Typography>}
          onChange={() => {
            setIsCarousel(!isCarousel);
            setIsReel(false);
          }}
        />
      </div>
      <DragAndDrop onPostsChange={setPosts} posts={posts} />
      <DialogActions className="mt-6">
        {errorMessage && (
          <Typography color="red" size="md">
            {errorMessage}
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
            disabled={hasNonImageFile}
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
