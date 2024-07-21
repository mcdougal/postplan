import Image from 'next/image';

type Props = {
  size: number;
  style?: `detailed` | `simple`;
};

const Logo = ({ size, style = `detailed` }: Props): React.ReactElement => {
  return (
    <Image
      alt="Postplan logo"
      height={size}
      priority
      src={
        style === `detailed`
          ? `https://rozbsaxyrosvdpentkzj.supabase.co/storage/v1/object/public/assets/logo-2024-07-21.svg`
          : `https://rozbsaxyrosvdpentkzj.supabase.co/storage/v1/object/public/assets/logo-simple-2024-07-21.svg`
      }
      unoptimized
      width={size}
    />
  );
};

export default Logo;
