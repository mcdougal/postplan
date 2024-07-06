/* eslint-disable no-console */

import { migrate } from 'drizzle-orm/postgres-js/migrator';

import { client, db } from '@/db/connection';

const run = async (): Promise<void> => {
  try {
    await migrate(db, { migrationsFolder: `./drizzle` });
  } finally {
    await client.end();
  }
};

if (module === require.main) {
  run().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
