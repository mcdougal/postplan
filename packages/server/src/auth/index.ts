import createUserFromOAuth from './createUserFromOAuth';
import { ForbiddenError } from './errors';
import exchangeCodeForSession from './exchangeCodeForSession';
import getAuthUser from './getAuthUser';
import logIn from './logIn';
import logInWithFacebook from './logInWithFacebook';
import logOut from './logOut';
import signUp from './signUp';
import { CookieMethods } from './types';
import updateSession from './updateSession';

export type { CookieMethods };

export {
  createUserFromOAuth,
  exchangeCodeForSession,
  ForbiddenError,
  getAuthUser,
  logIn,
  logInWithFacebook,
  logOut,
  signUp,
  updateSession,
};
