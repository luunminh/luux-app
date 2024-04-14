import { newCancelToken } from '@core/common';
import { httpService } from '@core/common/services/http';
import {
  IConfirmSignUpCodePayload,
  IForgotPasswordPayload,
  IResetPasswordPayload,
  ISignInPayload,
  ISignUpCodePayload,
  ISignUpPayload,
} from '.';

const signIn = (body: ISignInPayload) => httpService.post('/login', body, newCancelToken());

const signUp = (body: ISignUpPayload) => httpService.post('/signup', body, newCancelToken());

const getSignUpCode = (payload: ISignUpCodePayload) =>
  httpService.post('/signup-code', payload, newCancelToken());

const confirmSignUpCode = (payload: IConfirmSignUpCodePayload) =>
  httpService.post('/confirm-signup', payload, newCancelToken());

const forgotPassword = (payload: IForgotPasswordPayload) =>
  httpService.post('/forgot-password', payload, newCancelToken());

const resetPassword = (payload: IResetPasswordPayload) =>
  httpService.post('/reset-password', payload, newCancelToken());

export { confirmSignUpCode, forgotPassword, getSignUpCode, resetPassword, signIn, signUp };
