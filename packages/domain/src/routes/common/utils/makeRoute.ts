import { ParsedUrlQuery } from 'querystring';

import { getSiteUrl } from '@/common/env';

export type Router = {
  query: ParsedUrlQuery;
};

type GetPathArgs<P, S> =
  P extends Record<string, never>
    ? S extends Record<string, never>
      ? Record<string, never>
      : { searchParams: S }
    : S extends Record<string, never>
      ? { params: P }
      : { params: P; searchParams: S };

type RouteDefinition<P, S> =
  S extends Record<string, never>
    ? {
        /**
         * Build a link to this page in the app.
         */
        path: (args: GetPathArgs<P, S>) => string;
      }
    : {
        /**
         * Build a link to this page in the app.
         */
        path: (args: GetPathArgs<P, S>) => string;

        /**
         * Parse the route data out of the given Next.js router. May throw a
         * MissingRouteParamError if a required parameter is missing. Return
         * an empty object if the route doesn't have any associated data.
         */
        parse: (searchParams: URLSearchParams) => S;
      };

export type Route<P, S> =
  S extends Record<string, never>
    ? {
        /**
         * Build an absolute URL to this page in the app.
         */
        getAbsoluteUrl: (args: GetPathArgs<P, S>) => string;

        /**
         * Build a link to this page in the app.
         */
        getPath: (args: GetPathArgs<P, S>) => string;
      }
    : {
        /**
         * Build an absolute URL to this page in the app.
         */
        getAbsoluteUrl: (args: GetPathArgs<P, S>) => string;

        /**
         * Build a link to this page in the app.
         */
        getPath: (args: GetPathArgs<P, S>) => string;

        /**
         * Parse the route data out of the given Next.js router. May throw a
         * MissingRouteParamError if a required parameter is missing. Return
         * an empty object if the route doesn't have any associated data.
         */
        parse: (searchParams: URLSearchParams) => S;
      };

export default <P = Record<string, never>, S = Record<string, never>>(
  routeDefinition: RouteDefinition<P, S>
): Route<P, S> => {
  const getPath = (args: GetPathArgs<P, S>): string => {
    return routeDefinition.path(args);
  };

  const getAbsoluteUrl = (args: GetPathArgs<P, S>): string => {
    const siteUrl = getSiteUrl();
    const path = getPath(args);

    return `${siteUrl}${path}`;
  };

  const route = {
    getAbsoluteUrl,
    getPath,
    // eslint-disable-next-line @instaplan/no-type-assertion, @typescript-eslint/no-explicit-any
    parse: (routeDefinition as any).parse,
  };

  // eslint-disable-next-line @instaplan/no-type-assertion
  return route as Route<P, S>;
};
