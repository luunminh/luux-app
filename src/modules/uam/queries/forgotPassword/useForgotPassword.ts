import { responseWrapper } from '@core/common/services/http';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { IForgotPasswordPayload } from '.';
import { UAMApi } from '..';

// < return Data, Error, Payload Type, Context Types >
export function useForgotPassword(
  options?: UseMutationOptions<any, Error, IForgotPasswordPayload>,
) {
  const { mutate, isLoading } = useMutation<any, Error, IForgotPasswordPayload>({
    mutationFn: (payload: IForgotPasswordPayload) => {
      return responseWrapper(UAMApi.forgotPassword, [payload]);
    },
    ...options,
  });

  return {
    forgotPassword: mutate,
    isLoading,
  };
}
