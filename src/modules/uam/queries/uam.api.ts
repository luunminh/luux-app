import { newCancelToken } from '@core/common';
import { httpService } from '@core/common/services/http';
import { ISignUpCodePayload } from './getSignupCode';
import { SignInPayload } from './login';

const signIn = (body: SignInPayload) => httpService.post('/login', body, newCancelToken());

const getSignUpCode = (payload: ISignUpCodePayload) =>
  httpService.post('/signup-code', payload, newCancelToken());

export { getSignUpCode, signIn };
