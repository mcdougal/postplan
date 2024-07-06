import {
  BuildQueryResult,
  DBQueryConfig,
  ExtractTablesWithRelations,
} from 'drizzle-orm';

import * as schema from './schema';

// See: https://github.com/drizzle-team/drizzle-orm/issues/695#issuecomment-1881454650

type Schema = typeof schema;
type TSchema = ExtractTablesWithRelations<Schema>;

type QueryConfig<TableName extends keyof TSchema> = DBQueryConfig<
  'one' | 'many',
  boolean,
  TSchema,
  TSchema[TableName]
>;

export type QueryResult<
  TableName extends keyof TSchema,
  Columns extends QueryConfig<TableName>['columns'] | undefined = undefined,
  With extends QueryConfig<TableName>['with'] | undefined = undefined,
> = BuildQueryResult<
  TSchema,
  TSchema[TableName],
  {
    columns: Columns;
    with: With;
  }
>;
