import { ForbiddenError } from './errors';
import getAuthUser from './getAuthUser';
import logIn from './logIn';
import logOut from './logOut';
import signUp from './signUp';
import { CookieMethods } from './types';
import updateSession from './updateSession';

export type { CookieMethods };

export { ForbiddenError, getAuthUser, logIn, logOut, signUp, updateSession };
