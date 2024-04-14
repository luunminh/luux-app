import { FormCore } from '@components';
import {
  COLOR_CODE,
  ErrorService,
  ToastService,
  deepKeysHookFormErrors,
  scrollToTopError,
} from '@core/common';
import { Button, Flex, Stack, Text, UnstyledButton } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useConfirmSignUpCode, useGetSignUpCode } from '@modules/uam/queries';
import { uamPaths } from '@modules/uam/route';
import { FieldErrors, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ISignUpCodeForm, SignUpCodeFormKey } from './SignUpCodeModal.helpers';

type Props = {
  email: string;
};

const SignUpCodeModal = ({ email }: Props) => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get(SignUpCodeFormKey.TOKEN);

  const navigate = useNavigate();

  const defaultValues = { email, token };

  const handleCloseModal = () => modals.closeAll();

  const { confirmSignUpCode, isConfirmingSignUpCode } = useConfirmSignUpCode({
    onSuccess() {
      ToastService.success('Your account has been activated! Now you can login.');

      handleCloseModal();
      navigate(uamPaths.login);
    },
    onError(e) {
      ErrorService.handler(e);
    },
  });

  const { getSignUpCode, isGettingSignUpCode } = useGetSignUpCode({
    onSuccess() {
      ToastService.success('The code has been sent to your email');
    },
    onError(e) {
      ErrorService.handler(e);
    },
  });

  const { control, handleSubmit } = useForm<ISignUpCodeForm>({
    defaultValues,
    mode: 'onChange',
    shouldFocusError: true,
    reValidateMode: 'onChange',
  });

  const onValidFormSubmit = (values: ISignUpCodeForm) => {
    console.log('onValidFormSubmit ~ values:', values);
    confirmSignUpCode(values);
  };

  const onInvalidFormSubmit = (formErrors: FieldErrors<ISignUpCodeForm>) => {
    scrollToTopError(deepKeysHookFormErrors(formErrors));
  };

  const handleResendSignUpCode = () => {
    getSignUpCode({ email });
  };

  const isLoading = isConfirmingSignUpCode || isGettingSignUpCode;

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onValidFormSubmit, onInvalidFormSubmit)}>
      <Stack gap={16}>
        <FormCore.InputOtp name={SignUpCodeFormKey.TOKEN} control={control} />
        <Flex>
          <Text>
            Did not receive the email?{' '}
            <UnstyledButton
              disabled={isLoading}
              onClick={handleResendSignUpCode}
              style={{ color: COLOR_CODE.SUCCESS }}
            >
              Send Code
            </UnstyledButton>
          </Text>
        </Flex>
      </Stack>
      <Flex justify="end" gap={16} mt={16}>
        <Button variant="outline" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button type="submit" variant="gradient">
          Send
        </Button>
      </Flex>
    </form>
  );
};

export default SignUpCodeModal;
