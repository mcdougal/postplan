import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from '@/app/components';

type Props = {
  onCancel: () => void;
  onConfirm: () => void;
  open: boolean;
};

const DeletePlannedPostConfirmDialog = ({
  onCancel,
  onConfirm,
  open,
}: Props): React.ReactElement => {
  return (
    <Dialog maxWidth="lg" onClose={onCancel} open={open}>
      <div className="mb-4">
        <DialogTitle className="flex-1">Delete Post</DialogTitle>
      </div>
      <Typography size="md">
        Are you sure you want to delete this post?
      </Typography>
      <DialogActions className="mt-8">
        <Button color="secondary" onClick={onCancel} size="lg">
          Cancel
        </Button>
        <Button onClick={onConfirm} size="lg">
          Delete Post
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePlannedPostConfirmDialog;
