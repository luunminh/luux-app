import { useDebounce } from '@core/common';
import { PaginationResponseType, responseWrapper } from '@core/common/services/http';
import { UseInfiniteQueryOptions, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { useMemo, useState } from 'react';
import { DesignApi } from '..';
import { DESIGN_QUERY_KEYS } from '../key';
import { DesignUserType, GetDesignsParams, IGetDesigns } from './useGetDesignLazy.types';

const defaultSearch = {
  take: 10,
  skip: 0,
  type: DesignUserType.OWNER,
};

export function useGetDesignsLazy(
  options?: UseInfiniteQueryOptions<PaginationResponseType<IGetDesigns>, Error>,
) {
  const [inputSearch, setInputSearch] = useState<string>('');
  const [params, setParams] = useState<GetDesignsParams>(defaultSearch);
  const debounceSearch = useDebounce(inputSearch, 300);

  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetDesigns,
    fetchNextPage,
  } = useInfiniteQuery<PaginationResponseType<IGetDesigns>, Error>(
    [DESIGN_QUERY_KEYS.DESIGNS, params, debounceSearch, { type: 'lazy' }],
    (props): Promise<PaginationResponseType<IGetDesigns>> => {
      const { pageParam = defaultSearch } = props;

      return responseWrapper<PaginationResponseType<IGetDesigns>>(DesignApi.getDesigns, [
        { ...pageParam, ...params },
      ]);
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

  const designs = useMemo(() => {
    if (isEmpty(data?.pages)) return [];
    return data.pages.reduce((state, page, _pageIdx) => [...state, ...page.data], []);
  }, [data]) as IGetDesigns[];

  const handleInvalidateDesigns = () => queryClient.invalidateQueries([DESIGN_QUERY_KEYS.DESIGNS]);

  return {
    designs,
    hasNext,
    error,
    isError,
    isFetching,
    params,
    fetchNextPage,
    setParams,
    onGetDesigns,
    handleInvalidateDesigns,
    inputSearch,
    setInputSearch,
  };
}
