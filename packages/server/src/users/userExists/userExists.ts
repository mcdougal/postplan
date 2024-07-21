import { db, eq, lower } from '@/db/connection';
import { user } from '@/db/schema';

type Args = {
  where: {
    email: string;
  };
};

export default async (args: Args): Promise<boolean> => {
  const { email } = args.where;

  const matchingUser = await db.query.user.findFirst({
    where: eq(lower(user.email), email.toLowerCase()),
    columns: { id: true },
  });

  return Boolean(matchingUser);
};
