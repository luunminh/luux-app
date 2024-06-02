import { responseWrapper } from '@core/common/services/http';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { DesignApi } from '..';
import { CreateDesignPermissionPayload } from './useCreateDesignPermission.types';

export function useCreateDesignPermission(
  options?: UseMutationOptions<any, Error, CreateDesignPermissionPayload>,
) {
  const {
    mutate: onCreateDesignPermission,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<any, Error, CreateDesignPermissionPayload>({
    mutationFn: (payload: CreateDesignPermissionPayload) =>
      responseWrapper(DesignApi.createDesignPermission, [payload]),
    ...options,
  });

  return {
    onCreateDesignPermission,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
