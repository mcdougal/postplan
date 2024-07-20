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
        className="shadow-lg"
        onClick={() => {
          setDialogOpen(true);
        }}
        size="xl">
        + Plan Posts
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
