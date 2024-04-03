import { FormCore } from '@components';
import { PATHS } from '@config/paths';
import { COLOR_CODE, deepKeysHookFormErrors, scrollToTopError } from '@core/common';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, Stack, Text, Title } from '@mantine/core';
import { FieldErrors, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { UAMBody } from '../components';
import {
  SignInFormKey,
  SignInFormValue,
  initialSignInFormValue,
  signInFormSchema,
} from './SignIn.helpers';

type Props = {};

const SignIn = () => {
  const { control, handleSubmit } = useForm<SignInFormValue>({
    defaultValues: initialSignInFormValue,
    mode: 'onChange',
    shouldFocusError: true,
    reValidateMode: 'onChange',
    resolver: yupResolver<any>(signInFormSchema),
  });

  const onValidFormSubmit = (values: SignInFormValue) => {
    const { email, password } = values;

    // login({ email, password });
  };

  const onInvalidFormSubmit = (formErrors: FieldErrors<SignInFormValue>) => {
    scrollToTopError(deepKeysHookFormErrors(formErrors));
  };

  return (
    <UAMBody>
      <Stack mb={20} mt={42} align="center">
        <Title order={1} c={COLOR_CODE.GRAY_700}>
          Welcome
        </Title>
      </Stack>
      <form autoComplete="off" onSubmit={handleSubmit(onValidFormSubmit, onInvalidFormSubmit)}>
        <Grid grow gutter="md">
          <Grid.Col span={12}>
            <FormCore.Input
              required
              label="Email"
              control={control}
              name={SignInFormKey.EMAIL}
              placeholder="Enter your email"
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <FormCore.InputPassword
              required
              label="Password"
              control={control}
              name={SignInFormKey.PASSWORD}
              placeholder="Enter your password"
            />
          </Grid.Col>
          <Grid.Col span={12} style={{ textAlign: 'end' }}>
            <Link
              to={PATHS.forgotPassword}
              style={{
                color: COLOR_CODE.SUCCESS,
                textDecoration: 'none',
              }}
            >
              Forgot Password
            </Link>
          </Grid.Col>
          <Grid.Col span={12}>
            <Button type="submit" variant="gradient" fullWidth size="md">
              Sign in
            </Button>
          </Grid.Col>
          <Grid.Col span={12} style={{ textAlign: 'center' }}>
            <Text mt="sm">
              DON'T HAVE AN ACCOUNT?{' '}
              <Link
                to={PATHS.signup}
                style={{
                  color: COLOR_CODE.SUCCESS,
                  textDecoration: 'none',
                }}
              >
                SIGN UP
              </Link>
            </Text>
          </Grid.Col>
        </Grid>
      </form>
    </UAMBody>
  );
};

export default SignIn;
