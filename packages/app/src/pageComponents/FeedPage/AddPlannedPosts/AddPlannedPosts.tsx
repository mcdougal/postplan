'use client';

import { CurrentUser } from '@/common/users';
import { useState } from 'react';

import { Button } from '@/app/components';

import AddPlannedPostsDialog from './AddPlannedPostsDialog';

type Props = {
  currentUser: CurrentUser;
};

const AddPlannedPosts = ({ currentUser }: Props): React.ReactElement => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Button
        className="fixed bottom-8 right-8"
        onClick={() => {
          setDialogOpen(true);
        }}
        size="xl">
        + Add Posts
      </Button>
      <AddPlannedPostsDialog
        currentUser={currentUser}
        onClose={() => {
          setDialogOpen(false);
        }}
        open={dialogOpen}
      />
    </>
  );
};

export default AddPlannedPosts;
