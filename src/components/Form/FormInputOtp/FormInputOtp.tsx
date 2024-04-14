import { COLOR_CODE, isEmpty } from '@core/common';
import { PinInput, PinInputProps, Stack, Text } from '@mantine/core';
import { UseControllerProps, useController } from 'react-hook-form';

const FormInputOtp = ({
  control,
  size = 'xl',
  placeholder = '',
  length = 6,
  ...props
}: FormInputOtpProps) => {
  const { field, fieldState } = useController({ name: props.name, control });

  const hasError = !isEmpty(fieldState.error);

  return (
    <Stack gap={1}>
      <PinInput
        {...props}
        {...field}
        length={6}
        placeholder={placeholder}
        inputType="tel"
        inputMode="numeric"
        size={size}
        error={hasError}
      />
      {hasError && (
        <Text mt={5} size="sm" color={COLOR_CODE.DANGER}>
          {fieldState.error?.message}
        </Text>
      )}
    </Stack>
  );
};

type FormInputOtpProps<T = any> = UseControllerProps<T> & PinInputProps;

export default FormInputOtp;
