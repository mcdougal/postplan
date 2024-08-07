'use client';

import { useFormStatus } from 'react-dom';

import { Button, Input, InstagramIcon, Typography } from '@/app/components';

type Props = {
  errorMessage: string | null;
};

const InstagramUsernameFormFields = ({
  errorMessage,
}: Props): React.ReactElement => {
  const status = useFormStatus();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <InstagramIcon className="h-6 w-6" />
        <div className="flex-1">
          <Input name="instagramUsername" placeholder="Instagram username" />
        </div>
      </div>
      <Button className="mt-3" loading={status.pending} size="xl" type="submit">
        Next
      </Button>
      {errorMessage && (
        <Typography className="block text-center text-red-500" size="sm">
          {errorMessage}
        </Typography>
      )}
    </div>
  );
};

export default InstagramUsernameFormFields;
