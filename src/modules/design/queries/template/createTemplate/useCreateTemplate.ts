import { responseWrapper } from '@core/common/services/http';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { CreateTemplateApi, CreateTemplatePayload, CreateTemplateResponse } from '.';

export function useCreateTemplate(
  options?: UseMutationOptions<CreateTemplateResponse, Error, CreateTemplatePayload>,
) {
  const {
    mutate: onCreateTemplate,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<CreateTemplateResponse, Error, CreateTemplatePayload>({
    mutationFn: (payload: CreateTemplatePayload) =>
      responseWrapper(CreateTemplateApi.createTemplate, [payload]),
    ...options,
  });

  return {
    onCreateTemplate,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
