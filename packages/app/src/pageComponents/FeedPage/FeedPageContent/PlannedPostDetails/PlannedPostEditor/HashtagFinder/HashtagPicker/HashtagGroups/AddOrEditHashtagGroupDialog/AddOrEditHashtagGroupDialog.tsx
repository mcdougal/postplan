import { findHashtags } from '@/common/instagram';
import { PlannedPost } from '@/server/plannedPosts';
import { useEffect, useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Input,
  Textarea,
  Typography,
} from '@/app/components';

import { HashtagGroup } from '../useHashtagGroupsRequest';

import getClientErrorMessage from './getClientErrorMessage';
import getServerErrorMessage from './getServerErrorMessage';
import { AddOrEditDialogAction } from './types';
import useCreateHashtagGroupRequest from './useCreateHashtagGroupRequest';
import useUpdateHashtagGroupRequest from './useUpdateHashtagGroupRequest';

const MAX_HASHTAGS = 30;

type Props = {
  action: AddOrEditDialogAction;
  onClose: () => void;
  onGroupCreated: (hashtagGroup: HashtagGroup) => void;
  onGroupUpdated: (hashtagGroup: HashtagGroup) => void;
  open: boolean;
  plannedPost: PlannedPost;
};

const AddOrEditHashtagGroupDialog = ({
  action,
  onClose,
  onGroupCreated,
  onGroupUpdated,
  open,
  plannedPost,
}: Props): React.ReactElement => {
  const [displayName, setDisplayName] = useState(``);
  const [hashtagsString, setHashtagsString] = useState(``);
  const [canShowClientError, setCanShowClientError] = useState(false);
  const hashtags = findHashtags(hashtagsString);

  useEffect(() => {
    if (action.status === `edit`) {
      setDisplayName(action.group.displayName);
      setHashtagsString(action.group.hashtags.join(` `));
    }
  }, [action]);

  const onMutationCompleted = (): void => {
    onClose();
    setTimeout(() => {
      setDisplayName(``);
      setHashtagsString(``);
      setCanShowClientError(false);
    }, 1000);
  };

  const createHashtagGroupRequest = useCreateHashtagGroupRequest(
    plannedPost.userId,
    {
      onCompleted: (createdGroup) => {
        onGroupCreated(createdGroup);
        onMutationCompleted();
      },
    }
  );

  const updateHashtagGroupRequest = useUpdateHashtagGroupRequest({
    onCompleted: (updatedGroup) => {
      onGroupUpdated(updatedGroup);
      onMutationCompleted();
    },
  });

  const serverErrorMessage = getServerErrorMessage(
    createHashtagGroupRequest.error,
    updateHashtagGroupRequest.error,
    action
  );
  const clientErrorMessage = getClientErrorMessage(displayName, hashtags);
  const visibleErrorMessage =
    (canShowClientError && clientErrorMessage) || serverErrorMessage;

  const handleSubmit = (): void => {
    setCanShowClientError(true);
    if (clientErrorMessage) {
      return;
    }
    if (action.status === `add`) {
      createHashtagGroupRequest.createHashtagGroup({
        data: { displayName, hashtags },
      });
    } else if (action.status === `edit`) {
      updateHashtagGroupRequest.updateHashtagGroup({
        where: { id: action.group.id },
        data: { displayName, hashtags },
      });
    } else {
      const exhaustiveCheck: never = action;
      return exhaustiveCheck;
    }
  };

  const titleByAction: { [key in AddOrEditDialogAction['status']]: string } = {
    add: `Add Group`,
    edit: `Edit Group`,
  };

  const submitByAction: { [key in AddOrEditDialogAction['status']]: string } = {
    add: `Add Group`,
    edit: `Save`,
  };

  const remaining = MAX_HASHTAGS - hashtags.length;

  return (
    <Dialog maxWidth="lg" onClose={onClose} open={open}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}>
        <div className="mb-5 flex items-center gap-4">
          <DialogTitle className="flex-1">
            {titleByAction[action.status]}
          </DialogTitle>
          <Typography
            className="whitespace-nowrap"
            color={remaining < 0 ? `red` : `gray`}
            size="xs">
            # {remaining}/{MAX_HASHTAGS}
          </Typography>
        </div>
        <div className="flex flex-col gap-2">
          <Input
            autoFocus
            onChange={(event) => {
              setDisplayName(event.target.value);
              setCanShowClientError(false);
            }}
            placeholder="Name the group..."
            value={displayName}
          />
          <Textarea
            onChange={(event) => {
              setHashtagsString(event.target.value);
              setCanShowClientError(false);
            }}
            placeholder="Type some hashtags..."
            rows={6}
            size="md"
            value={hashtagsString}
            variant="contained"
          />
        </div>
        <DialogActions className="mt-6">
          {visibleErrorMessage && (
            <Typography className="block pr-2" color="red" size="md">
              {visibleErrorMessage}
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
          <Button
            loading={
              createHashtagGroupRequest.loading ||
              updateHashtagGroupRequest.loading
            }
            size="xl"
            type="submit">
            {submitByAction[action.status]}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddOrEditHashtagGroupDialog;
