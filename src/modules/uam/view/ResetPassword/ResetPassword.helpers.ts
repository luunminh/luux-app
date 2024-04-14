import { ErrorService, Yup } from '@core/common';

export interface IResetPasswordForm {
  email: string;
  newPassword: string;
  token: string;
  confirmPassword: string;
}

export enum ResetPasswordFormKey {
  EMAIL = 'email',
  NEW_PASSWORD = 'newPassword',
  TOKEN = 'token',
  CONFIRM_PASSWORD = 'confirmPassword',
}

export const resetPasswordInitialValues: IResetPasswordForm = {
  email: '',
  newPassword: '',
  confirmPassword: '',
  token: null,
};

export const resetPasswordFormSchema = Yup.object().shape({
  email: Yup.string().required().notTrimmable().email(),
  newPassword: Yup.string().required().notTrimmable().password(),
  token: Yup.string().required().numberOnly().length(6),
  confirmPassword: Yup.string()
    .required()
    .notTrimmable()
    .oneOf(
      [Yup.ref(ResetPasswordFormKey.NEW_PASSWORD), null],
      ErrorService.MESSAGES.matchConfirmPassword,
    ),
});
