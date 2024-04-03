import { TextInput, TextInputProps } from '@mantine/core';
import { UseControllerProps, useController } from 'react-hook-form';

const FormInput = ({ control, size = 'md', ...props }: FormInputProps) => {
  const { field, fieldState } = useController({ name: props.name, control });

  return <TextInput {...props} {...field} size={size} error={fieldState.error?.message} />;
};

type FormInputProps<T = any> = UseControllerProps<T> & TextInputProps;

export default FormInput;
