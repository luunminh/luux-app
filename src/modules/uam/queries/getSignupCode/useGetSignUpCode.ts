import { responseWrapper } from '@core/common/services/http';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { UAMApi } from '..';
import { ISignUpCodePayload } from './useGetSignUpCode.types';

// < return Data, Error, Payload Type, Context Types >
export function useGetSignUpCode(options?: UseMutationOptions<any, Error, ISignUpCodePayload>) {
  const { mutate, isLoading } = useMutation<any, Error, ISignUpCodePayload>({
    mutationFn: (payload: ISignUpCodePayload) => {
      return responseWrapper(UAMApi.getSignUpCode, [payload]);
    },
    ...options,
  });

  return {
    getSignUpCode: mutate,
    isGettingSignUpCode: isLoading,
  };
}
