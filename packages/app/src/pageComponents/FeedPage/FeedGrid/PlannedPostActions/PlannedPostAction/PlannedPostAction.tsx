import { Button } from '@/app/components';

type Props = {
  icon: (props: { className?: string }) => React.ReactNode;
  label: string;
  onClick: () => void;
};

const PlannedPostAction = ({
  icon,
  label,
  onClick,
}: Props): React.ReactElement => {
  return (
    <Button
      key={label}
      color="secondary"
      onClick={onClick}
      size="lg"
      startIcon={icon}>
      <div className="min-w-14 text-left">{label}</div>
    </Button>
  );
};

export default PlannedPostAction;
