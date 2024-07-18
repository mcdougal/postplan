import { db, eq } from '@/db/connection';
import { instagramConnection } from '@/db/schema';

export default async (userId: string): Promise<boolean> => {
  const connection = await db.query.instagramConnection.findFirst({
    where: eq(instagramConnection.userId, userId),
    columns: { id: true },
  });

  return Boolean(connection);
};
