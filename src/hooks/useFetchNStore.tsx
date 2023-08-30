'use client';

import { callApi } from '@/services/Axios';
import { useQuery } from '@tanstack/react-query';

type FetchResult = {
  isLoading: boolean;
  data: any;
  error: any;
};

const fetchArray = [
  {
    url: 'location/get-countries',
    dataKey: 'countries',
  },
  {
    url: 'location/get-divisions',
    dataKey: 'divisions',
  },
  {
    url: 'job/get-categories',
    dataKey: 'jobCategories',
  },
  {
    url: 'settings/form-options',
    dataKey: 'formOptions',
  },
];

const useFetchNStore = (dataKey: string, url?: any): FetchResult => {
  const { data, error, isLoading } = useQuery(
    [dataKey],
    async () => {
      const response = await callApi(fetchUrl);
      const { data, message, success } = response;

      if (success) {
        return data;
      } else {
        return message as string; // add type assertion here
      }
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );

  const fetchUrl = url
    ? url
    : fetchArray.find((item) => item.dataKey === dataKey)?.url;

  if (!fetchUrl) {
    console.log(`useFetchNStore hook called for ${dataKey} without url`);
    return { isLoading: false, data: null, error: null };
  }

  return { isLoading, data, error };
};

export default useFetchNStore;
