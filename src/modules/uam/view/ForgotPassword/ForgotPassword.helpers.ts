import { Yup } from '@core/common';

export interface IForgotPasswordForm {
  email: string;
}

export enum ForgotPasswordFormKey {
  EMAIL = 'email',
}

export const forgotPasswordInitialValues: IForgotPasswordForm = {
  email: '',
};

export const forgotPasswordFormSchema = Yup.object().shape({
  email: Yup.string().required().notTrimmable().email(),
});
