import { useDebounce } from '@core/common';
import { PaginationResponseType, responseWrapper } from '@core/common/services/http';
import { UseInfiniteQueryOptions, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { useMemo, useState } from 'react';
import { GetTemplatesApi } from '../../';
import { GetTemplatesLazyParams, GetTemplatesLazyResponse } from './getTemplatesLazy.types';

const defaultSearch = {
  take: 10,
  skip: 0,
};

const QUERY_KEY = {
  GET_TEMPLATES: '/template',
};

export function useGetTemplatesLazy(
  options?: UseInfiniteQueryOptions<PaginationResponseType<GetTemplatesLazyResponse>, Error>,
) {
  const [inputSearch, setInputSearch] = useState<string>('');
  const [params, setParams] = useState<GetTemplatesLazyParams>(defaultSearch);
  const debounceSearch = useDebounce(inputSearch, 300);

  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetTemplates,
    fetchNextPage,
  } = useInfiniteQuery<PaginationResponseType<GetTemplatesLazyResponse>, Error>(
    [QUERY_KEY.GET_TEMPLATES, params, debounceSearch, { type: 'lazy' }],
    (props): Promise<PaginationResponseType<GetTemplatesLazyResponse>> => {
      const { pageParam = defaultSearch } = props;

      return responseWrapper<PaginationResponseType<GetTemplatesLazyResponse>>(
        GetTemplatesApi.getTemplates,
        [{ ...pageParam, ...params }],
      );
    },
    {
      keepPreviousData: true,
      getNextPageParam(lastPage, allPages) {
        if (lastPage.data?.length < 10) return undefined;
        return {
          take: 10,
          skip: allPages.length * 10,
        };
      },
      notifyOnChangeProps: ['data', 'isFetching'],
      enabled: !!params,
      ...options,
    },
  );

  const hasNext = useMemo(() => {
    if (isEmpty(data?.pages)) return null;
    return data.pages[data.pages.length - 1]?.hasNext;
  }, [data]);

  const queryClient = useQueryClient();

  const templates = useMemo(() => {
    if (isEmpty(data?.pages)) return [];
    return data.pages.reduce((state, page, _pageIdx) => [...state, ...page.data], []);
  }, [data]) as GetTemplatesLazyResponse[];

  const handleInvalidateTemplates = () => queryClient.invalidateQueries([QUERY_KEY.GET_TEMPLATES]);

  return {
    templates,
    hasNext,
    error,
    isError,
    isFetching,
    params,
    fetchNextPage,
    setParams,
    onGetTemplates,
    handleInvalidateTemplates,
    inputSearch,
    setInputSearch,
  };
}
