import { PaginationResponseType, responseWrapper } from '@core/common/services/http';
import { GetPropertiesParams, isEmpty } from '@core/common/utils';
import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { GetTemplatesApi, GetTemplatesResponse } from '.';

const QUERY_KEY = {
  GET_TEMPLATES: '/template',
};

type UseGetTemplatesParams = {
  defaultParams?: {
    // update type of params
    [key: string]: any;
  };
  options?: UseQueryOptions<
    PaginationResponseType<GetTemplatesResponse>,
    Error,
    PaginationResponseType<GetTemplatesResponse>
  >;
};

export function useGetTemplates({ defaultParams, options }: UseGetTemplatesParams = {}) {
  const [params, setParams] = useState<GetPropertiesParams>(defaultParams ?? {});

  const {
    data,
    error,
    isError,
    isFetching: isLoading,
    refetch: onGetTemplates,
  } = useQuery<
    PaginationResponseType<GetTemplatesResponse>,
    Error,
    PaginationResponseType<GetTemplatesResponse>
  >({
    queryKey: [QUERY_KEY.GET_TEMPLATES, params],
    queryFn: (query) => {
      const [, ...params] = query.queryKey;
      return responseWrapper<PaginationResponseType<GetTemplatesResponse>>(
        GetTemplatesApi.getTemplates,
        params,
      );
    },
    notifyOnChangeProps: ['data', 'isFetching'],
    keepPreviousData: true,
    enabled: !isEmpty(params),
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateGetTemplates = () => {
    return queryClient.invalidateQueries([QUERY_KEY.GET_TEMPLATES]);
  };

  const { data: datas = [], hasNext, payloadSize, totalRecords } = data || {};

  return {
    templates: datas,
    hasNext,
    payloadSize,
    totalRecords,
    isError,
    error,
    isLoading,
    onGetTemplates,
    params,
    setParams,
    handleInvalidateGetTemplates,
  };
}
