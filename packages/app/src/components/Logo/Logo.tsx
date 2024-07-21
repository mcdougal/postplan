import Image from 'next/image';

type Props = {
  size: number;
};

const Logo = ({ size }: Props): React.ReactElement => {
  return (
    <Image
      alt="Postplan logo"
      height={size}
      priority
      src="https://rozbsaxyrosvdpentkzj.supabase.co/storage/v1/object/public/assets/logo-2024-07-21.svg"
      unoptimized
      width={size}
    />
  );
};

export default Logo;
