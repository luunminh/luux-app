import { FormCore } from '@components';
import {
  COLOR_CODE,
  ErrorService,
  ToastService,
  deepKeysHookFormErrors,
  isEmpty,
  scrollToTopError,
} from '@core/common';
import { Form } from '@core/components';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, Stack, Text, Title } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useSignUp } from '@modules/uam/queries';
import { uamPaths } from '@modules/uam/route';
import { useCallback, useEffect } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { Link, useSearchParams } from 'react-router-dom';
import { SignUpCodeModal, UAMBody } from '../components';
import {
  ISignUpForm,
  SignUpFormKey,
  SignUpFormSchema,
  signUpFormInitialValues,
} from './SignUp.helpers';

const SignUp = () => {
  const [searchParams] = useSearchParams();
  const isOpenConfirmSignUpModal = !isEmpty(searchParams.get('token'));

  const { signUp, isSigningUp } = useSignUp({
    onSuccess() {
      ToastService.success('Sign up success! Please check your email to active your account.');
      handleOpenConfirmSignUpModal();
    },
    onError(error) {
      ErrorService.handler(error);
    },
  });

  const { control, handleSubmit, watch } = useForm<ISignUpForm>({
    defaultValues: signUpFormInitialValues,
    mode: 'onChange',
    shouldFocusError: true,
    reValidateMode: 'onChange',
    resolver: yupResolver<any>(SignUpFormSchema),
  });
  const email = searchParams.get(SignUpFormKey.EMAIL) || watch(SignUpFormKey.EMAIL);

  const onValidFormSubmit = (values: ISignUpForm) => {
    const { confirmPassword, ...payload } = values;
    signUp(payload);
  };

  const onInvalidFormSubmit = (formErrors: FieldErrors<ISignUpForm>) => {
    scrollToTopError(deepKeysHookFormErrors(formErrors));
  };

  const handleOpenConfirmSignUpModal = useCallback(() => {
    modals.open({
      title: <Title order={4}>Confirm Sign Up Code</Title>,
      children: <SignUpCodeModal email={email} />,
      size: 'md',
    });
  }, [email]);

  useEffect(() => {
    if (isOpenConfirmSignUpModal) {
      handleOpenConfirmSignUpModal();
    }
  }, [isOpenConfirmSignUpModal, handleOpenConfirmSignUpModal]);

  return (
    <UAMBody>
      <Stack my={42} align="center">
        <Title order={1} c={COLOR_CODE.GRAY_700}>
          Create Account
        </Title>
      </Stack>
      <Form customSubmit={handleSubmit(onValidFormSubmit, onInvalidFormSubmit)}>
        <Grid grow gutter="md">
          <Grid.Col span={6}>
            <FormCore.Input
              required
              label="First Name"
              control={control}
              name={SignUpFormKey.FIRST_NAME}
              placeholder="Enter your first name"
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <FormCore.Input
              required
              label="Last Name"
              control={control}
              name={SignUpFormKey.LAST_NAME}
              placeholder="Enter your last name"
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <FormCore.Input
              required
              label="Email"
              control={control}
              name={SignUpFormKey.EMAIL}
              placeholder="Enter your email"
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <FormCore.InputPassword
              required
              label="Password"
              control={control}
              name={SignUpFormKey.PASSWORD}
              placeholder="Enter your password"
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <FormCore.InputPassword
              required
              control={control}
              label="Confirm Password"
              name={SignUpFormKey.CONFIRM_PASSWORD}
              placeholder="Enter your confirm password"
            />
          </Grid.Col>
          <Grid.Col>
            <Button type="submit" variant="gradient" loading={isSigningUp} fullWidth size="md">
              Sign Up
            </Button>
          </Grid.Col>
          <Grid.Col span={12} style={{ textAlign: 'center' }}>
            <Text mt="sm">
              ALREADY HAVE AN ACCOUNT?{' '}
              <Link
                to={uamPaths.login}
                style={{
                  color: COLOR_CODE.SUCCESS,
                  textDecoration: 'none',
                }}
              >
                SIGN IN
              </Link>
            </Text>
          </Grid.Col>
        </Grid>
      </Form>
    </UAMBody>
  );
};

export default SignUp;
