import { getRequiredEnvVar, isProduction } from '@/common/env';
import { ExtractTablesWithRelations, sql, SQL } from 'drizzle-orm';
import { PgTransaction, AnyPgColumn } from 'drizzle-orm/pg-core';
import {
  PostgresJsDatabase,
  PostgresJsQueryResultHKT,
  drizzle,
} from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schema';

// Disable prefetch as it is not supported for "Transaction" pool mode
// See: https://orm.drizzle.team/docs/get-started-postgresql#supabase
const PREPARE = false;

let ssl: Record<string, string> | undefined = undefined;

if (isProduction()) {
  ssl = { ca: getRequiredEnvVar(`SUPABASE_CERT`) };
}

export const client = postgres(getRequiredEnvVar(`POSTGRES_URL`), {
  prepare: PREPARE,
  ssl,
});

// Avoid too many connections when we are hot reloading
declare global {
  // eslint-disable-next-line no-var
  var dbGlobal: PostgresJsDatabase<typeof schema> | null;
}

const makeDrizzleClient = (): PostgresJsDatabase<typeof schema> => {
  return drizzle(client, {
    schema,
  });
};

const getDrizzleClient = (): PostgresJsDatabase<typeof schema> => {
  if (isProduction()) {
    return makeDrizzleClient();
  }

  // Avoid too many connections when we are hot reloading
  if (!globalThis.dbGlobal) {
    globalThis.dbGlobal = makeDrizzleClient();
  }

  return globalThis.dbGlobal;
};

export const db = getDrizzleClient();

export type DrizzleTransaction = PgTransaction<
  PostgresJsQueryResultHKT,
  typeof schema,
  ExtractTablesWithRelations<typeof schema>
>;

// There are too many utilities to manually export one-by-one, so we're
// just re-exporting everything.
// eslint-disable-next-line @instaplan/no-export-from
export * from 'drizzle-orm';

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = `NotFoundError`;
  }
}

export const first = <T>(array: Array<T>): T | null => {
  return array.length ? array[0] : null;
};

export const firstOrThrow = <T>(array: Array<T>): T => {
  if (array.length === 0) {
    throw new NotFoundError(`Not found`);
  }

  return array[0];
};

export const lower = (value: AnyPgColumn): SQL => {
  return sql`lower(${value})`;
};
