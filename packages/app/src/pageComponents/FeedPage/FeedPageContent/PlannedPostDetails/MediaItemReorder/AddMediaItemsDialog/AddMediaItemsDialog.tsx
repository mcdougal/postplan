'use client';

import { CurrentUser } from '@/common/users';
import { useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from '@/app/components';

import DragAndDrop from './DragAndDrop';
import postIsNotImage from './postIsNotImage';
import { Post } from './types';
import useCreateMediaItemsRequest from './useCreateMediaItemsRequest';

type Props = {
  currentUser: CurrentUser;
  onClose: () => void;
  open: boolean;
  plannedPostId: string;
};

const AddMediaItemsDialog = ({
  currentUser,
  onClose,
  open,
  plannedPostId,
}: Props): React.ReactElement => {
  const [posts, setPosts] = useState<Array<Post>>([]);

  const createMediaItemsRequest = useCreateMediaItemsRequest(
    currentUser,
    plannedPostId,
    posts,
    {
      onCompleted: () => {
        onClose();
        setTimeout(() => {
          setPosts([]);
        }, 1000);
      },
    }
  );

  const hasNonImageFile = posts.some(postIsNotImage);
  const errorMessage = hasNonImageFile
    ? `Only image files are allowed`
    : createMediaItemsRequest.error;

  return (
    <Dialog maxWidth="2xl" onClose={onClose} open={open}>
      <div className="mb-5 flex">
        <DialogTitle className="flex-1">Add To Carousel</DialogTitle>
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
            loading={createMediaItemsRequest.loading}
            onClick={() => {
              createMediaItemsRequest.createMediaItems();
            }}
            size="xl">
            Add {posts.length}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AddMediaItemsDialog;
