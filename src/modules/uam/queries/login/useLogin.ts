import { responseWrapper } from '@core/common/services/http';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { ISignInPayload, UAMApi } from '..';

// < return Data, Error, Payload Type, Context Types >
export function useLogin(options?: UseMutationOptions<any, Error, ISignInPayload>) {
  const { mutate, isLoading } = useMutation<any, Error, ISignInPayload>({
    mutationFn: (payload: ISignInPayload) => {
      return responseWrapper(UAMApi.signIn, [payload]);
    },
    ...options,
  });

  return {
    login: mutate,
    isSigning: isLoading,
  };
}
