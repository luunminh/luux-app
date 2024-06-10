import { responseWrapper } from '@core/common/services/http';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { DeleteDesignPermissionPayload } from '.';
import { DesignApi } from '../../';

export function useDeleteDesignPermission(
  options?: UseMutationOptions<any, Error, DeleteDesignPermissionPayload>,
) {
  const {
    mutate: onDeleteDesignPermission,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<any, Error, DeleteDesignPermissionPayload>({
    mutationFn: (payload: DeleteDesignPermissionPayload) =>
      responseWrapper(DesignApi.deleteDesignPermission, [payload]),
    ...options,
  });

  return {
    onDeleteDesignPermission,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
