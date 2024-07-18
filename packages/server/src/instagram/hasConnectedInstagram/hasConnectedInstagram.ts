import queryActiveInstagramConnection from '../queryActiveInstagramConnection';

type Args = {
  auth: { currentUserId: string };
  where: { userId: string };
};

export default async (args: Args): Promise<boolean> => {
  const { currentUserId } = args.auth;
  const { userId } = args.where;

  const instagramConnection = await queryActiveInstagramConnection({
    auth: { currentUserId },
    where: { userId },
  });

  return Boolean(instagramConnection);
};
