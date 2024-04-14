import { Yup } from '@core/common';

export interface ISignUpCodeForm {
  email: string;
  token: string;
}

export enum SignUpCodeFormKey {
  EMAIL = 'email',
  TOKEN = 'token',
}

export const signUpCodeFormSchema = Yup.object().shape({
  [SignUpCodeFormKey.EMAIL]: Yup.string().email().required(),
  [SignUpCodeFormKey.TOKEN]: Yup.string().required().numberOnly().length(6),
});

export const numberRegex = /^-?\d*(\.\d+)?$/;
