import { UserData } from '../../utils/firebase/firebase.utils';
import {
  Action,
  ActionWithPayload,
  createAction,
  withMatcher
} from '../../utils/reducer/reducer.utils';
import { USER_ACTION_TYPES } from './user.types';

export type SetCurrentUser = ActionWithPayload<
  USER_ACTION_TYPES.SET_CURRENT_USER,
  UserData
>;
export type CheckUserSession =
  Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;
export type GoogleSignInStart =
  Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>;
export type EmailSignInStart = ActionWithPayload<
  USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
  { email: string; password: string }
>;
export type SignInSuccess = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_IN_SUCCESS,
  UserData
>;
export type SignInFailure = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_IN_FAILURE,
  Error
>;
export type SignOutStart =
  Action<USER_ACTION_TYPES.SIGN_OUT_START>;
export type SignOutSuccess =
  Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>;
export type SignOutFailure = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_OUT_FAILURE,
  Error
>;
export type SignUpStart = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_UP_START,
  { email: string; password: string }
>;
export type SignUpSuccess =
  Action<USER_ACTION_TYPES.SIGN_UP_SUCCESS>;
export type SignUpFailure = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_UP_FAILURE,
  Error
>;

export const setCurrentUser = (
  user: UserData
): SetCurrentUser => ({
  type: USER_ACTION_TYPES.SET_CURRENT_USER,
  payload: user
});

const _checkUserSession = (): CheckUserSession =>
  createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

const _googleSignInStart = (): GoogleSignInStart =>
  createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);

const _emailSignInStart = (
  email: string,
  password: string
): EmailSignInStart =>
  createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {
    email,
    password
  });

const _signInSuccess = (
  user: UserData & { id: string }
): SignInSuccess =>
  createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);

const _signInFailed = (error: Error): SignInFailure =>
  createAction(USER_ACTION_TYPES.SIGN_IN_FAILURE, error);

const _signOutStart = (): SignOutStart =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_START);

const _signOutSuccess = (): SignOutSuccess =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);

const _signOutFailed = (error: Error): SignOutFailure =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_FAILURE, error);

const _signUpStart = (
  email: string,
  password: string
): SignUpStart =>
  createAction(USER_ACTION_TYPES.SIGN_UP_START, {
    email,
    password
  });
const _signUpSuccess = (): SignUpSuccess =>
  createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS);
const _signUpFailed = (error: Error): SignUpFailure =>
  createAction(USER_ACTION_TYPES.SIGN_UP_FAILURE, error);

export const checkUserSession = withMatcher(
  _checkUserSession
);
export const googleSignInStart = withMatcher(
  _googleSignInStart
);
export const emailSignInStart = withMatcher(
  _emailSignInStart
);

export const signInSuccess = withMatcher(_signInSuccess);
export const signInFailed = withMatcher(_signInFailed);
export const signOutStart = withMatcher(_signOutStart);
export const signOutSuccess = withMatcher(_signOutSuccess);
export const signOutFailed = withMatcher(_signOutFailed);
export const signUpStart = withMatcher(_signUpStart);
export const signUpSuccess = withMatcher(_signUpSuccess);
export const signUpFailed = withMatcher(_signUpFailed);
