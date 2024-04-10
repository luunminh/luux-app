import { responseWrapper } from '@core/common/services/http';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { SignInPayload, UAMApi } from '..';

// < return Data, Error, Payload Type, Context Types >
export function useLogin(options?: UseMutationOptions<any, Error, SignInPayload>) {
  const { mutate, isLoading } = useMutation<any, Error, SignInPayload>({
    mutationFn: (payload: SignInPayload) => {
      return responseWrapper(UAMApi.signIn, [payload]);
    },
    ...options,
  });

  return {
    login: mutate,
    isSigning: isLoading,
  };
}
