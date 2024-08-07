import { CurrentUser } from '@/common/users';

import { Logo, Typography } from '@/app/components';

import AddPlannedPosts from '../AddPlannedPosts';

type Props = {
  currentUser: CurrentUser;
};

const WelcomeCard = ({ currentUser }: Props): React.ReactElement => {
  return (
    <div className="flex flex-1 justify-center pb-20">
      <div className="relative w-full max-w-[600px] flex-1 bg-white p-10 shadow-2xl">
        <div className="mb-8 flex items-center gap-4">
          <Logo size={32} style="simple" />
          <Typography size="2xl" weight="bold">
            Welcome to Postplan!
          </Typography>
        </div>
        <Typography className="mb-8 block" size="md">
          Your feed will load momentarily. While you wait, let’s start planning
          some posts. Can’t wait to see what you create!
        </Typography>
        <AddPlannedPosts currentUser={currentUser} />
      </div>
    </div>
  );
};

export default WelcomeCard;
