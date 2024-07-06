'use client';

import { useFormStatus } from 'react-dom';

import { Button, Input, Typography } from '@/app/components';

type Props = {
  errorMessage: string | null;
};

const LogInFormFields = ({ errorMessage }: Props): React.ReactElement => {
  const status = useFormStatus();

  return (
    <div className="flex flex-col gap-3">
      <Input autoFocus label="Email" name="email" type="email" />
      <Input label="Password" name="password" type="password" />
      <Button className="mt-3" loading={status.pending} size="xl" type="submit">
        Log In
      </Button>
      {errorMessage && (
        <Typography className="text-red-500" size="sm">
          {errorMessage}
        </Typography>
      )}
    </div>
  );
};

export default LogInFormFields;
