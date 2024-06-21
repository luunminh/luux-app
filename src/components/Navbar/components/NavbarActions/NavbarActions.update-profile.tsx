import { ToastService, Yup } from '@core/common';
import { FormCore } from '@core/components';
import { useProfile } from '@core/queries';
import { useUpdateProfile } from '@core/queries/profile/updateProfile';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Flex, Grid, TextInput } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useEffect, useMemo } from 'react';
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

const updateUserFormInitialValues: UpdateUserFormValues = {
  firstName: '',
  lastName: '',
  middleName: '',
};

const UpdateUserFormValidationSchema = Yup.object().shape({
  [UpdateUserFormKey.FIRST_NAME]: Yup.string().required(),
  [UpdateUserFormKey.LAST_NAME]: Yup.string().required(),
  [UpdateUserFormKey.MIDDLE_NAME]: Yup.string().nullable(),
});

const UpdateUserModal = () => {
  const { profile, handleInvalidateProfile } = useProfile();

  const { onUpdateProfile, isLoading } = useUpdateProfile({
    onSuccess: () => {
      ToastService.success('Profile updated successfully');
      handleInvalidateProfile();
      modals.closeAll();
    },
    onError: (error) => {
      ToastService.error(error.message);
    },
  });

  const defaultValues = useMemo(() => {
    return {
      ...updateUserFormInitialValues,
      firstName: profile.firstName,
      lastName: profile.lastName,
      middleName: profile.middleName,
    };
  }, [profile]);

  const { control, handleSubmit, reset } = useForm<UpdateUserFormValues>({
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    resolver: yupResolver<any>(UpdateUserFormValidationSchema),
  });

  const onValidSubmit = (formValues: UpdateUserFormValues) => {
    console.log(formValues);
    onUpdateProfile({ id: profile.id, ...formValues });
  };

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  return (
    <FormCore.Wrapper customSubmit={handleSubmit(onValidSubmit)}>
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
