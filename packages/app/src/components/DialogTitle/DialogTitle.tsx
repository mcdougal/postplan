import Typography from '../Typography';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const DialogTitle = ({ children, className }: Props): React.ReactElement => {
  return (
    <Typography className={className} size="xl" weight="bold">
      {children}
    </Typography>
  );
};

export default DialogTitle;
