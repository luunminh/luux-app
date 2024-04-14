import { ErrorService, Yup } from '@core/common';

export enum SignUpFormKey {
  EMAIL = 'email',
  PASSWORD = 'password',
  CONFIRM_PASSWORD = 'confirmPassword',
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
}

export interface ISignUpForm {
  [SignUpFormKey.EMAIL]: string;
  [SignUpFormKey.PASSWORD]: string;
  [SignUpFormKey.CONFIRM_PASSWORD]: string;
  [SignUpFormKey.FIRST_NAME]: string;
  [SignUpFormKey.LAST_NAME]: string;
}

export const signUpFormInitialValues: ISignUpForm = {
  [SignUpFormKey.EMAIL]: '',
  [SignUpFormKey.PASSWORD]: '',
  [SignUpFormKey.CONFIRM_PASSWORD]: '',
  [SignUpFormKey.FIRST_NAME]: '',
  [SignUpFormKey.LAST_NAME]: '',
};

export const SignUpFormSchema = Yup.object().shape({
  [SignUpFormKey.EMAIL]: Yup.string().email().required(),

  [SignUpFormKey.PASSWORD]: Yup.string().min(6).required(),
  [SignUpFormKey.CONFIRM_PASSWORD]: Yup.string()
    .oneOf([Yup.ref(SignUpFormKey.PASSWORD), null], ErrorService.MESSAGES.matchConfirmPassword)
    .required(),

  [SignUpFormKey.FIRST_NAME]: Yup.string().required().max(25),
  [SignUpFormKey.LAST_NAME]: Yup.string().required().max(25),
});
