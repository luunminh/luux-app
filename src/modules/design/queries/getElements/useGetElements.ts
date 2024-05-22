import { useDebounce } from '@core/common';
import { PaginationResponseType, responseWrapper } from '@core/common/services/http';
import { isEmpty } from '@core/common/utils';
import { UseInfiniteQueryOptions, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { GetElementsParams, IElement } from '.';
import { DesignApi } from '..';
import { DESIGN_QUERY_KEYS } from '../key';

const defaultPageParams = {
  skip: 0,
  take: 18,
};

export function useGetElementsLazy(
  options?: UseInfiniteQueryOptions<PaginationResponseType<IElement>, Error>,
) {
  const [inputSearch, setInputSearch] = useState<string>('');
  const [params, setParams] = useState<GetElementsParams>({});
  const debounceSearch = useDebounce(inputSearch, 300);

  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetElements,
    fetchNextPage,
  } = useInfiniteQuery<PaginationResponseType<IElement>, Error>(
    [DESIGN_QUERY_KEYS.ELEMENTS, 'options', params, debounceSearch, { type: 'lazy' }],
    (props): Promise<PaginationResponseType<IElement>> => {
      const { pageParam = defaultPageParams } = props;

      return responseWrapper<PaginationResponseType<IElement>>(DesignApi.getElements, [
        { ...pageParam, ...params, search: inputSearch.trim() },
      ]);
    },
    {
      keepPreviousData: true,
      getNextPageParam(lastPage, allPages) {
        if (lastPage.data?.length < 18) return undefined;
        return {
          take: 18,
          skip: allPages.length * 18,
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

  const elements = useMemo(() => {
    if (isEmpty(data?.pages)) return [];
    return data.pages.reduce((state, page, _pageIdx) => [...state, ...page.data], []);
  }, [data]) as IElement[];

  const handleInvalidateElements = () =>
    queryClient.invalidateQueries([DESIGN_QUERY_KEYS.ELEMENTS]);

  return {
    elements,
    hasNext,
    error,
    isError,
    isFetching,
    fetchNextPage,
    setParams,
    onGetElements,
    handleInvalidateElements,
    inputSearch,
    setInputSearch,
  };
}
