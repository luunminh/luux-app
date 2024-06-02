import { responseWrapper } from '@core/common/services/http';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { UpdateDesignPermissionPayload } from '.';
import { DesignApi } from '..';

export function useUpdateDesignPermission(
  options?: UseMutationOptions<any, Error, UpdateDesignPermissionPayload>,
) {
  const {
    mutate: onUpdateDesignPermission,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<any, Error, UpdateDesignPermissionPayload>({
    mutationFn: (payload: UpdateDesignPermissionPayload) =>
      responseWrapper(DesignApi.updateDesignPermission, [payload]),
    ...options,
  });

  return {
    onUpdateDesignPermission,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
