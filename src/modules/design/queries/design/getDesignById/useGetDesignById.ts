import { ToastService } from '@core/common';
import { ApiResponseType, getResponseData, responseWrapper } from '@core/common/services/http';
import { useProfile } from '@core/queries';
import { useDesignStore } from '@modules/design/view/DesignForm';
import { homePaths } from '@modules/home/route';
import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { socketService } from 'src/service';
import { DesignApi } from '../..';
import { DESIGN_QUERY_KEYS } from '../../key';
import { IGetDesign } from './useGetDesignById.types';

export function useGetDesignById(
  options?: UseQueryOptions<ApiResponseType<IGetDesign>, Error, IGetDesign> & {
    id?: string;
  },
) {
  const navigate = useNavigate();
  const {
    profile: { id },
  } = useProfile();

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
      onError: (error: any) => {
        if (error.statusCode === 403) {
          ToastService.error(error.message);
          setTimeout(() => {
            navigate(homePaths.home);
          }, 1000);
        }
      },
      ...options,
    },
  );

  const { onSetData, onSetOnlineUsers } = useDesignStore();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (designDetail && isSuccess) {
      socketService.joinDesign({
        designId: designDetail.id,
      });

      socketService.subscribeToEditing((data) => {
        console.log('socketService.subscribeToEditing ~ data:', data);
        onSetData(data);
      });

      socketService.subscribeToJoin((newUsers) => {
        console.log('socketService.subscribeToJoin ~ newUserId:', newUsers);
        onSetOnlineUsers(newUsers);
      });

      socketService.subscribeToLeave((users) => {
        onSetOnlineUsers(users);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [designDetail, isSuccess, id]);

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
