import { responseWrapper } from '@core/common/services/http';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { IConfirmSignUpCodePayload } from '.';
import { UAMApi } from '..';

// < return Data, Error, Payload Type, Context Types >
export function useConfirmSignUpCode(
  options?: UseMutationOptions<any, Error, IConfirmSignUpCodePayload>,
) {
  const { mutate, isLoading } = useMutation<any, Error, IConfirmSignUpCodePayload>({
    mutationFn: (payload: IConfirmSignUpCodePayload) => {
      return responseWrapper(UAMApi.confirmSignUpCode, [payload]);
    },
    ...options,
  });

  return {
    confirmSignUpCode: mutate,
    isConfirmingSignUpCode: isLoading,
  };
}
