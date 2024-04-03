import { Yup } from '@core/common/services';

export enum SignInFormKey {
  EMAIL = 'email',
  PASSWORD = 'password', // pragma: allowlist secret
}

export type SignInFormValue = {
  email: string;
  password: string;
};

export const initialSignInFormValue: SignInFormValue = { email: '', password: '' };

export const signInFormSchema = Yup.object().shape({
  email: Yup.string().required().notTrimmable().email(),
  password: Yup.string().required().min(6, 'Password must be at least 6 characters.'),
});
