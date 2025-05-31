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

const ReloadFeedConfirmDialog = ({
  onCancel,
  onConfirm,
  open,
}: Props): React.ReactElement => {
  return (
    <Dialog maxWidth="lg" onClose={onCancel} open={open}>
      <div className="mb-4">
        <DialogTitle className="flex-1">Reload Feed</DialogTitle>
      </div>
      <Typography size="md">
        Are you sure you want to reload your feed? This won’t affect your
        planned posts.
      </Typography>
      <DialogActions className="mt-8">
        <Button color="secondary" onClick={onCancel} size="lg">
          Cancel
        </Button>
        <Button onClick={onConfirm} size="lg">
          Reload Feed
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReloadFeedConfirmDialog;
