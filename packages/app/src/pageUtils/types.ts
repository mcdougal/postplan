import { Metadata } from 'next';

export type Page<
  Params = Record<string, never>,
  SearchParams = Record<string, never>,
> = ({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) => Promise<React.ReactElement>;

export type GenerateMetadata<
  Params = Record<string, never>,
  SearchParams = Record<string, never>,
> = ({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) => Promise<Metadata>;
