import { responseWrapper } from '@core/common/services/http';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { IResetPasswordPayload } from '.';
import { UAMApi } from '..';

// < return Data, Error, Payload Type, Context Types >
export function useResetPassword(options?: UseMutationOptions<any, Error, IResetPasswordPayload>) {
  const { mutate, isLoading } = useMutation<any, Error, IResetPasswordPayload>({
    mutationFn: (payload: IResetPasswordPayload) => {
      return responseWrapper(UAMApi.resetPassword, [payload]);
    },
    ...options,
  });

  return {
    resetPassword: mutate,
    isLoading,
  };
}
