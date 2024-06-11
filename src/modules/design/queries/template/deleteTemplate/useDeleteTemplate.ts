import { responseWrapper } from '@core/common/services/http';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { DeleteTemplateApi, DeleteTemplatePayload, DeleteTemplateResponse } from '.';

export function useDeleteTemplate(
  options?: UseMutationOptions<DeleteTemplateResponse, Error, DeleteTemplatePayload>,
) {
  const {
    mutate: onDeleteTemplate,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<DeleteTemplateResponse, Error, DeleteTemplatePayload>({
    mutationFn: (payload: DeleteTemplatePayload) =>
      responseWrapper(DeleteTemplateApi.deleteTemplate, [payload]),
    ...options,
  });

  return {
    onDeleteTemplate,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
