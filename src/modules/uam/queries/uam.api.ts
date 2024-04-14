import { newCancelToken } from '@core/common';
import { httpService } from '@core/common/services/http';
import { IConfirmSignUpCodePayload } from './confirmSignUpCode';
import { IForgotPasswordPayload } from './forgotPassword/useForgotPassword.types';
import { ISignUpCodePayload } from './getSignupCode';
import { SignInPayload } from './login';
import { ISignUpPayload } from './signup';

const signIn = (body: SignInPayload) => httpService.post('/login', body, newCancelToken());

const signUp = (body: ISignUpPayload) => httpService.post('/signup', body, newCancelToken());

const getSignUpCode = (payload: ISignUpCodePayload) =>
  httpService.post('/signup-code', payload, newCancelToken());

const confirmSignUpCode = (payload: IConfirmSignUpCodePayload) =>
  httpService.post('/confirm-signup', payload, newCancelToken());

const forgotPassword = (payload: IForgotPasswordPayload) =>
  httpService.post('/forgot-password', payload, newCancelToken());

export { confirmSignUpCode, forgotPassword, getSignUpCode, signIn, signUp };
