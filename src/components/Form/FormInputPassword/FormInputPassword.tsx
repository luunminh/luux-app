import { PasswordInput, PasswordInputProps } from '@mantine/core';
import { UseControllerProps, useController } from 'react-hook-form';

const FormInputPassword = ({ control, ...props }: FormInputProps) => {
  const { field, fieldState } = useController({ name: props.name, control });

  return <PasswordInput {...props} {...field} error={fieldState.error?.message} />;
};

type FormInputProps<T = any> = UseControllerProps<T> & PasswordInputProps;

export default FormInputPassword;
