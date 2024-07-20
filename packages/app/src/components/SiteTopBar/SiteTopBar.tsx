/* eslint-disable @typescript-eslint/no-explicit-any */
import { LogOutRoute, LogInRoute } from '@/common/routes';
import { CurrentUser } from '@/common/users';
import { HTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

import TextLink from '../TextLink';
import Typography from '../Typography';

type Props = HTMLAttributes<HTMLDivElement> & {
  currentUser: CurrentUser | null;
};

const SiteTopBar = forwardRef<any, Props>(
  ({ className, currentUser, ...divProps }, ref): React.ReactElement => {
    return (
      <div
        ref={ref}
        className={twMerge(
          `flex h-12 items-center justify-between border-b border-gray-200 px-4`,
          className
        )}
        {...divProps}>
        <Typography size="lg" weight="bold">
          Postplan
        </Typography>
        <Typography size="sm">
          {currentUser ? (
            <TextLink as="a" color="default" href={LogOutRoute.getPath({})}>
              Log Out
            </TextLink>
          ) : (
            <TextLink as="a" color="default" href={LogInRoute.getPath({})}>
              Log In
            </TextLink>
          )}
        </Typography>
      </div>
    );
  }
);

SiteTopBar.displayName = `SiteTopBar`;

export default SiteTopBar;
