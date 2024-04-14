import { FormCore } from '@components';
import { COLOR_CODE, ErrorService, ToastService, isEmpty } from '@core/common';
import { Form } from '@core/components';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, Stack, Text, Title } from '@mantine/core';
import { useResetPassword } from '@modules/uam/queries';
import { uamPaths } from '@modules/uam/route';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UAMBody } from '../components';
import {
  IResetPasswordForm,
  ResetPasswordFormKey,
  resetPasswordFormSchema,
  resetPasswordInitialValues,
} from './ResetPassword.helpers';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const email = searchParams.get(ResetPasswordFormKey.EMAIL);
  const token = searchParams.get(ResetPasswordFormKey.TOKEN);

  const defaultValues = useMemo(() => {
    return {
      ...resetPasswordInitialValues,
      email,
      token,
    };
  }, [email, token]);

  const { resetPassword, isLoading } = useResetPassword({
    onSuccess() {
      ToastService.success('Reset password successfully!');

      setTimeout(() => {
        navigate(uamPaths.login);
      }, 2000);
    },
    onError(e) {
      ErrorService.handler(e);
    },
  });

  const { handleSubmit, control } = useForm<IResetPasswordForm>({
    defaultValues,
    mode: 'onChange',
    shouldFocusError: true,
    reValidateMode: 'onChange',
    resolver: yupResolver<any>(resetPasswordFormSchema),
  });

  const onValidSubmit = (values: IResetPasswordForm) => {
    const { confirmPassword, ...payload } = values;
    resetPassword(payload);
  };

  useEffect(() => {
    if (isEmpty(email)) {
      navigate(uamPaths.forgotPassword);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  return (
    <UAMBody>
      <Stack my={48} align="center" gap={16}>
        <Title order={1} c={COLOR_CODE.GRAY_700}>
          Reset Password
        </Title>
        <Text
          c={COLOR_CODE.GRAY_600}
          style={{
            textAlign: 'center',
          }}
        >
          Check your email and enter your verification code
        </Text>
        <FormCore.Input
          disabled
          style={{ width: '100%' }}
          control={control}
          placeholder="Enter your email"
          name={ResetPasswordFormKey.EMAIL}
        />
      </Stack>
      <Form customSubmit={handleSubmit(onValidSubmit)}>
        <Grid grow gutter="md">
          <Grid.Col span={12} display="flex" style={{ justifyContent: 'center' }}>
            <FormCore.InputOtp name={ResetPasswordFormKey.TOKEN} control={control} />
          </Grid.Col>
          <Grid.Col span={12}>
            <FormCore.InputPassword
              required
              label="Password"
              control={control}
              name={ResetPasswordFormKey.NEW_PASSWORD}
              placeholder="Enter your new password"
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <FormCore.InputPassword
              required
              control={control}
              label="Confirm Password"
              name={ResetPasswordFormKey.CONFIRM_PASSWORD}
              placeholder="Enter your confirm password"
            />
          </Grid.Col>
          <Grid.Col mt={16}>
            <Button type="submit" loading={isLoading} variant="gradient" fullWidth size="md">
              Continue
            </Button>
          </Grid.Col>
        </Grid>
      </Form>
    </UAMBody>
  );
};

export default ResetPassword;
