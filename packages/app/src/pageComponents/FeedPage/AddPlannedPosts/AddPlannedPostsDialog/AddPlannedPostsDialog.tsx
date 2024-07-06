'use client';

import { CurrentUser } from '@/domain/users/common';
import { useState } from 'react';

import { Button, Dialog, DialogActions, Typography } from '@/app/components';

import DragAndDrop from './DragAndDrop';
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

  const createPlannedPostsRequest = useCreatePlannedPostsRequest(
    currentUser,
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

  return (
    <Dialog maxWidth="2xl" onClose={onClose} open={open}>
      <div className="mb-5">
        <Typography size="xl" weight="bold">
          Add Posts
        </Typography>
      </div>
      <DragAndDrop onPostsChange={setPosts} posts={posts} />
      <DialogActions className="mt-6">
        {createPlannedPostsRequest.error && (
          <Typography color="red" size="md">
            {createPlannedPostsRequest.error}
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
            loading={createPlannedPostsRequest.loading}
            onClick={createPlannedPostsRequest.createPlannedPosts}
            size="xl">
            Add {posts.length}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AddPlannedPostsDialog;
