import { ToastService, Yup } from '@core/common';
import { FormCore } from '@core/components';
import { useChangePassword, useProfile } from '@core/queries';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Flex, Grid } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

type ChangePasswordFormValues = {
  newPassword: string;
  confirmPassword: string;
};

enum ChangePasswordFormKey {
  NEW_PASSWORD = 'newPassword',
  CONFIRM_PASSWORD = 'confirmPassword',
}

const changePasswordFormInitialValues: ChangePasswordFormValues = {
  newPassword: '',
  confirmPassword: '',
};

const changePasswordFormValidationSchema = Yup.object().shape({
  [ChangePasswordFormKey.NEW_PASSWORD]: Yup.string().required('Password is required'),
  [ChangePasswordFormKey.CONFIRM_PASSWORD]: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref(ChangePasswordFormKey.NEW_PASSWORD)], 'Passwords must match'),
});

const ChangePasswordModal = () => {
  const { profile } = useProfile();

  const { onChangePassword, isLoading } = useChangePassword({
    onSuccess: () => {
      ToastService.success('Password changed successfully');
    },
    onError: (error) => {
      ToastService.error(error.message);
    },
  });

  const { control, handleSubmit, reset } = useForm<ChangePasswordFormValues>({
    defaultValues: changePasswordFormInitialValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    resolver: yupResolver<any>(changePasswordFormValidationSchema),
  });

  const onValidSubmit = (formValues: ChangePasswordFormValues) => {
    console.log(formValues);
    onChangePassword({ newPassword: formValues.newPassword });
  };

  useEffect(() => {
    reset(changePasswordFormInitialValues);
  }, [reset]);

  return (
    <FormCore.Wrapper onSubmit={handleSubmit(onValidSubmit)}>
      <Grid>
        <Grid.Col span={12}>
          <FormCore.InputPassword
            control={control}
            name={ChangePasswordFormKey.NEW_PASSWORD}
            label="New password"
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <FormCore.InputPassword
            control={control}
            name={ChangePasswordFormKey.CONFIRM_PASSWORD}
            label="Confirm password"
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Flex justify="end" gap={16} mt={16}>
            <Button variant="outline" disabled={isLoading} onClick={modals.closeAll}>
              Cancel
            </Button>
            <Button loading={isLoading} type="submit" variant="gradient">
              Save
            </Button>
          </Flex>
        </Grid.Col>
      </Grid>
    </FormCore.Wrapper>
  );
};
export default ChangePasswordModal;
