import { ToastService, Yup } from '@core/common';
import { FormCore } from '@core/components';
import { useChangePassword } from '@core/queries';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Flex, Grid } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

type ChangePasswordFormValues = {
  password: string;
  newPassword: string;
  confirmPassword: string;
};

enum ChangePasswordFormKey {
  PASSWORD = 'password',
  NEW_PASSWORD = 'newPassword',
  CONFIRM_PASSWORD = 'confirmPassword',
}

const changePasswordFormInitialValues: ChangePasswordFormValues = {
  password: '',
  newPassword: '',
  confirmPassword: '',
};

const changePasswordFormValidationSchema = Yup.object().shape({
  [ChangePasswordFormKey.PASSWORD]: Yup.string().required(),
  [ChangePasswordFormKey.NEW_PASSWORD]: Yup.string().required(),
  [ChangePasswordFormKey.CONFIRM_PASSWORD]: Yup.string()
    .required()
    .oneOf([Yup.ref(ChangePasswordFormKey.NEW_PASSWORD)]),
});

const ChangePasswordModal = () => {
  const { onChangePassword, isLoading } = useChangePassword({
    onSuccess: () => {
      ToastService.success('Password changed successfully');
      modals.closeAll();
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
    onChangePassword({ password: formValues.password, newPassword: formValues.newPassword });
  };

  useEffect(() => {
    reset(changePasswordFormInitialValues);
  }, [reset]);

  return (
    <FormCore.Wrapper customSubmit={handleSubmit(onValidSubmit)}>
      <Grid>
        <Grid.Col span={12}>
          <FormCore.InputPassword
            control={control}
            name={ChangePasswordFormKey.PASSWORD}
            label="Old password"
          />
        </Grid.Col>
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
