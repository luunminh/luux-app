import { ApiResponseType, responseWrapper } from '@core/common/services/http';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { DesignApi } from '../../';
import { CreateDesignPayload } from './useCreateDesign.types';

export function useCreateDesign(
  options?: UseMutationOptions<ApiResponseType<string>, Error, CreateDesignPayload>,
) {
  const {
    mutate: onCreateDesign,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<string>, Error, CreateDesignPayload>({
    mutationFn: (payload: CreateDesignPayload) =>
      responseWrapper(DesignApi.createDesign, [payload]),
    ...options,
  });

  return {
    onCreateDesign,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
