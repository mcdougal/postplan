'use client';

import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { useFormStatus } from 'react-dom';

import { Button, Input, Typography } from '@/app/components';

type Props = {
  errorMessage: string | null;
};

const LogInFormFields = ({ errorMessage }: Props): React.ReactElement => {
  const status = useFormStatus();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <EnvelopeIcon className="h-6 w-6" />
        <div className="flex-1">
          <Input autoFocus name="email" placeholder="Email" type="email" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <LockClosedIcon className="h-6 w-6" />
        <div className="flex-1">
          <Input name="password" placeholder="Password" type="password" />
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

export default LogInFormFields;
