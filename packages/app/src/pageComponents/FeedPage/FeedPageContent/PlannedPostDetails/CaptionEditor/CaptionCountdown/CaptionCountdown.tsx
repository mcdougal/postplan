import { Typography } from '@/app/components';

type Props = {
  count: number;
  label: string;
  max: number;
};

const CaptionCountdown = ({ count, label, max }: Props): React.ReactElement => {
  const remaining = max - count;

  return (
    <Typography
      className="whitespace-nowrap"
      color={remaining < 0 ? `red` : `gray`}
      size="xs">
      {label} {remaining}/{max}
    </Typography>
  );
};

export default CaptionCountdown;
