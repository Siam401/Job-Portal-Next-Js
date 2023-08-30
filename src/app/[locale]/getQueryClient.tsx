import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          //   staleTime: 1000 * 60 * 5,
          refetchOnMount: false,
          refetchOnWindowFocus: false,
        },
      },
    })
);
export default getQueryClient;

/**
 * The QueryClient constructor takes an optional QueryClientOptions object that allows you to configure the default options for all queries in the client. Here's an overview of the available options:
 *
 * defaultOptions.queries.cacheTime: The default cache time for queries in milliseconds. This determines how long query results will be cached in the client before they are considered stale and need to be refetched. The default value is 0, which means queries will not be cached by default.
 *
 * defaultOptions.queries.staleTime: The default stale time for queries in milliseconds. This determines how long query results will be considered fresh before they are considered stale and need to be refetched. The default value is 0, which means queries will always be refetched by default.
 *
 * defaultOptions.queries.refetchOnMount: Whether queries should automatically refetch when they are mounted. The default value is true.
 *
 * defaultOptions.queries.refetchOnWindowFocus: Whether queries should automatically refetch when the window is focused. The default value is true.
 *
 * defaultOptions.queries.refetchOnReconnect: Whether queries should automatically refetch when the network reconnects. The default value is true.
 *
 * defaultOptions.queries.retry: Whether failed queries should retry automatically. The default value is true.
 *
 * defaultOptions.queries.retryDelay: The base amount of time in milliseconds to wait before retrying a failed query. The default value is 1000.
 *
 * defaultOptions.queries.retryOnMount: Whether queries should automatically retry when they are mounted. The default value is false.
 *
 * defaultOptions.queries.retryOnMountDelay: The base amount of time in milliseconds to wait before retrying a failed query when it is mounted. The default value is 1000.
 *
 * defaultOptions.queries.suspense: Whether queries should be suspended by default. The default value is false.
 *
 * defaultOptions.queries.useErrorBoundary: Whether errors thrown during queries should be caught and rendered by React Error Boundaries. The default value is false.
 *
 * defaultOptions.queries.usePaginated: Whether paginated queries should be enabled by default. The default value is false.
 *
 * defaultOptions.queries.queryFn: The default query function to use for queries. The default value is () => undefined.
 *
 * defaultOptions.queries.queryKeySerializerFn: The default query key serializer function to use for queries. The default value is JSON.stringify.
 *
 * defaultOptions.queries.queryHashFn: The default query hash function to use for queries. The default value is JSON.stringify.
 *
 * defaultOptions.queries.queryCache: The default query cache to use for queries. The default value is the global query cache.
 *
 * defaultOptions.queries.queryFnParamsFilter: The default query function params filter to use for queries. The default value is () => undefined.
 *
 * defaultOptions.queries.isDataEqual: The default isDataEqual function to use for queries. The default value is Object.is. This function is used to determine if the previous data is equal to the current data.
 *
 * defaultOptions.queries.isFetching: The default isFetching function to use for queries. The default value is () => false.
 *
 * defaultOptions.queries.isStale: The default isStale function to use for queries. The default value is () => false.
 */
