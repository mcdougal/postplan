import queryActiveConnection from '../queryActiveConnection';

type Args = {
  auth: { currentUserId: string };
  where: { userId: string };
};

export default async (args: Args): Promise<boolean> => {
  const { currentUserId } = args.auth;
  const { userId } = args.where;

  const activeInstagramConnection = await queryActiveConnection({
    auth: { currentUserId },
    where: { userId },
  });

  return Boolean(activeInstagramConnection);
};
