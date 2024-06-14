import { ToastService, Yup } from '@core/common';
import { FormCore } from '@core/components';
import { useProfile, useUpdateUser } from '@core/queries';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Flex, Grid, TextInput } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

type UpdateUserFormValues = {
  firstName: string;
  lastName: string;
  middleName: string;
};

enum UpdateUserFormKey {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  MIDDLE_NAME = 'middleName',
}

const UpdateUserFormInitialValues: UpdateUserFormValues = {
  firstName: '',
  lastName: '',
  middleName: '',
};

const UpdateUserFormValidationSchema = Yup.object().shape({
  [UpdateUserFormKey.FIRST_NAME]: Yup.string().required(),
  [UpdateUserFormKey.LAST_NAME]: Yup.string().required(),
  [UpdateUserFormKey.MIDDLE_NAME]: Yup.string(),
});

const UpdateUserModal = () => {
  const { profile } = useProfile();

  const { onUpdateUser, isLoading } = useUpdateUser({
    onSuccess: () => {
      ToastService.success('Profile updated successfully');
    },
    onError: (error) => {
      ToastService.error(error.message);
    },
  });

  const { control, handleSubmit, reset } = useForm<UpdateUserFormValues>({
    defaultValues: UpdateUserFormInitialValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    resolver: yupResolver<any>(UpdateUserFormValidationSchema),
  });

  const onValidSubmit = (formValues: UpdateUserFormValues) => {
    console.log(formValues);
    onUpdateUser({ id: profile.id, ...formValues });
  };

  useEffect(() => {
    reset(UpdateUserFormInitialValues);
  }, [reset]);

  return (
    <FormCore.Wrapper onSubmit={handleSubmit(onValidSubmit)}>
      <Grid>
        <Grid.Col span={12}>
          <TextInput label="Email" disabled value={profile.email} />
        </Grid.Col>
        <Grid.Col span={12}>
          <FormCore.Input
            control={control}
            name={UpdateUserFormKey.FIRST_NAME}
            label="First Name"
            required
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <FormCore.Input
            control={control}
            name={UpdateUserFormKey.LAST_NAME}
            label="Last Name"
            required
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <FormCore.Input
            control={control}
            name={UpdateUserFormKey.MIDDLE_NAME}
            label="Middle Name"
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
export default UpdateUserModal;
