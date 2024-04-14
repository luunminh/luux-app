import { responseWrapper } from '@core/common/services/http';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { UAMApi } from '..';
import { ISignUpPayload } from './useSignup.types';

export function useSignUp(options?: UseMutationOptions<any, Error, ISignUpPayload>) {
  const { mutate, isLoading, isSuccess } = useMutation<any, Error, ISignUpPayload>({
    mutationFn: (payload: ISignUpPayload) => responseWrapper(UAMApi.signUp, [payload]),
    ...options,
  });

  return {
    signUp: mutate,
    isSigningUp: isLoading,
    isSuccess,
  };
}
