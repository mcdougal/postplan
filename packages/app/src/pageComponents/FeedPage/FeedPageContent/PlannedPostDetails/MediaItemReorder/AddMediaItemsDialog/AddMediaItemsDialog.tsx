'use client';

import { PlannedPost } from '@/server/plannedPosts';
import { useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from '@/app/components';

import DragAndDrop from './DragAndDrop';
import getClientErrorMessage from './getClientErrorMessage';
import { Post } from './types';
import useCreateMediaItemsRequest from './useCreateMediaItemsRequest';

type Props = {
  onClose: () => void;
  open: boolean;
  plannedPost: PlannedPost;
};

const AddMediaItemsDialog = ({
  onClose,
  open,
  plannedPost,
}: Props): React.ReactElement => {
  const [posts, setPosts] = useState<Array<Post>>([]);

  const createMediaItemsRequest = useCreateMediaItemsRequest({
    onCompleted: () => {
      onClose();
      setTimeout(() => {
        setPosts([]);
      }, 1000);
    },
  });

  const clientErrorMessage = getClientErrorMessage(posts);
  const serverErrorMessage = createMediaItemsRequest.error;

  return (
    <Dialog maxWidth="2xl" onClose={onClose} open={open}>
      <div className="mb-5 flex">
        <DialogTitle className="flex-1">Add To Carousel</DialogTitle>
      </div>
      <DragAndDrop
        plannedPost={plannedPost}
        posts={posts}
        setPosts={setPosts}
      />
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
            loading={createMediaItemsRequest.loading}
            onClick={() => {
              const isLoading = posts.some((post) => {
                return post.uploadingStatus === `loading`;
              });

              if (isLoading) {
                return;
              }

              createMediaItemsRequest.createMediaItems(plannedPost, posts);
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
