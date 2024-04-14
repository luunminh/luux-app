import { newCancelToken } from '@core/common';
import { httpService } from '@core/common/services/http';
import { IConfirmSignUpCodePayload } from './confirmSignUpCode';
import { ISignUpCodePayload } from './getSignupCode';
import { SignInPayload } from './login';
import { ISignUpPayload } from './signup/useSignup.types';

const signIn = (body: SignInPayload) => httpService.post('/login', body, newCancelToken());

const signUp = (body: ISignUpPayload) => httpService.post('/signup', body, newCancelToken());

const getSignUpCode = (payload: ISignUpCodePayload) =>
  httpService.post('/signup-code', payload, newCancelToken());

const confirmSignUpCode = (payload: IConfirmSignUpCodePayload) =>
  httpService.post('/confirm-signup', payload, newCancelToken());

export { confirmSignUpCode, getSignUpCode, signIn, signUp };
