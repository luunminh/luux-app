import { socketService } from '@core/common';
import { ApiResponseType, getResponseData, responseWrapper } from '@core/common/services/http';
import { useDesignStore } from '@modules/design/view/DesignForm';
import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { DesignApi } from '..';
import { DESIGN_QUERY_KEYS } from '../key';
import { IGetDesign } from './useGetDesignById.types';

export function useGetDesignById(
  options?: UseQueryOptions<ApiResponseType<IGetDesign>, Error, IGetDesign> & {
    id?: string;
  },
) {
  const {
    data: designDetail,
    error,
    isError,
    isFetching: isLoadingDesignDetail,
    refetch: onGetDesignDetail,
    isSuccess,
  } = useQuery<ApiResponseType<IGetDesign>, Error, IGetDesign>(
    [DESIGN_QUERY_KEYS.DESIGN, { id: options?.id }],
    {
      queryFn: (query) => {
        const [, ...params] = query.queryKey;
        return responseWrapper<ApiResponseType<IGetDesign>>(DesignApi.getDesignById, params);
      },
      select: getResponseData,
      notifyOnChangeProps: ['data', 'refetch'],
      enabled: !!options?.id,
      ...options,
    },
  );

  const { onSetData } = useDesignStore();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (designDetail && isSuccess) {
      socketService.joinDesign(designDetail.id);
      socketService.subscribeToEditing((data) => {
        console.log('socketService.subscribeToEditing ~ data:', data);
        onSetData(data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [designDetail, isSuccess]);

  const handleInvalidateDesignDetail = (id: string) => {
    return queryClient.invalidateQueries([DESIGN_QUERY_KEYS.DESIGN, { id }]);
  };

  return {
    designDetail,
    error,
    isError,
    isLoadingDesignDetail,
    onGetDesignDetail,
    handleInvalidateDesignDetail,
  };
}
