import { responseWrapper } from '@core/common/services/http';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { DeleteDesignApi, DeleteDesignPayload, DeleteDesignResponse } from '.';

export function useDeleteDesign(
  options?: UseMutationOptions<DeleteDesignResponse, Error, DeleteDesignPayload>,
) {
  const {
    mutate: onDeleteDesign,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<DeleteDesignResponse, Error, DeleteDesignPayload>({
    mutationFn: (payload: DeleteDesignPayload) =>
      responseWrapper(DeleteDesignApi.deleteDesign, [payload]),
    ...options,
  });

  return {
    onDeleteDesign,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
