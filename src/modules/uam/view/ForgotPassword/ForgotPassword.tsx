import { FormCore } from '@components';
import { COLOR_CODE, ErrorService, ToastService } from '@core/common';
import { Form } from '@core/components';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, Stack, Text, Title } from '@mantine/core';
import { useForgotPassword } from '@modules/uam/queries';
import { uamPaths } from '@modules/uam/route';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UAMBody } from '../components';
import {
  ForgotPasswordFormKey,
  IForgotPasswordForm,
  forgotPasswordFormSchema,
  forgotPasswordInitialValues,
} from './ForgotPassword.helpers';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleBackToLogin = () => navigate(uamPaths.login);

  const { forgotPassword, isLoading } = useForgotPassword({
    onSuccess() {
      ToastService.success('Please check your email for instructions to reset your password.');
      navigate(`${uamPaths.resetPassword}?email=${email}`);
    },
    onError(e) {
      ErrorService.handler(e);
    },
  });

  const { handleSubmit, control, watch } = useForm<IForgotPasswordForm>({
    defaultValues: forgotPasswordInitialValues,
    mode: 'onChange',
    shouldFocusError: true,
    reValidateMode: 'onChange',
    resolver: yupResolver<any>(forgotPasswordFormSchema),
  });
  const email = watch(ForgotPasswordFormKey.EMAIL);

  const onValidSubmit = (values: IForgotPasswordForm) => {
    forgotPassword(values);
  };

  return (
    <UAMBody>
      <Stack my={42} align="center" gap={24}>
        <Title order={1} c={COLOR_CODE.GRAY_700}>
          Forgot Password
        </Title>
        <Text
          c={COLOR_CODE.GRAY_600}
          style={{
            textAlign: 'center',
          }}
        >
          Please enter the email associated with your account and we’ll send you instructions to
          reset your password.
        </Text>
      </Stack>
      <Form customSubmit={handleSubmit(onValidSubmit)}>
        <Grid grow gutter="xl">
          <Grid.Col span={12}>
            <FormCore.Input
              required
              label="Email"
              control={control}
              placeholder="Enter your email"
              name={ForgotPasswordFormKey.EMAIL}
            />
          </Grid.Col>
          <Grid.Col>
            <Stack gap={12}>
              <Button type="submit" loading={isLoading} variant="gradient" fullWidth size="md">
                Continue
              </Button>
              <Button
                onClick={handleBackToLogin}
                loading={isLoading}
                variant="outline"
                fullWidth
                size="md"
              >
                Back to Login
              </Button>
            </Stack>
          </Grid.Col>
        </Grid>
      </Form>
    </UAMBody>
  );
};

export default ForgotPassword;
