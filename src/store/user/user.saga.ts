import { User } from 'firebase/auth';
import {
  call,
  takeLatest,
  put,
  all
} from 'typed-redux-saga/macro';
import {
  signInWithGooglePopup,
  signOutUser,
  getCurrentUser,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';

import {
  EmailSignInStart,
  emailSignInStart,
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutSuccess,
  signUpFailed,
  SignUpStart,
  signUpSuccess
} from './user.action';

import { USER_ACTION_TYPES } from './user.types';

export function* getSnapshotFromUserAuth(userAuth: User) {
  try {
    const userSnapshot = yield* call(
      createUserDocumentFromAuth,
      userAuth
    );
    if (userSnapshot)
      yield* put(
        signInSuccess({
          id: userSnapshot.id,
          ...userSnapshot.data()
        })
      );
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

function* signInWithGoogle() {
  getCurrentUser();
  try {
    const { user } = yield* call(signInWithGooglePopup);
    const userSnapshot = yield* call(
      createUserDocumentFromAuth,
      user
    );
    if (userSnapshot)
      yield* put(
        signInSuccess({
          id: userSnapshot.id,
          ...userSnapshot.data()
        })
      );
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

function* signInWithEmailAndPassword({
  payload: { email, password }
}: EmailSignInStart) {
  try {
    getCurrentUser();
    const userCredential = yield* call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    if (userCredential) {
      const { user } = userCredential;
      const userSnapshot = yield* call(
        createUserDocumentFromAuth,
        user
      );
      if (userSnapshot)
        yield* put(
          signInSuccess({
            id: userSnapshot.id,
            ...userSnapshot.data()
          })
        );
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

function* signOut() {
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess());
  } catch (error) {
    yield* put(signOutFailed(error as Error));
  }
}

function* signUp({
  payload: { email, password }
}: SignUpStart) {
  try {
    const userCredential = yield* call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    const { user } = userCredential || { user: null };

    user && (yield* call(createUserDocumentFromAuth, user));
    yield* put(signUpSuccess());
  } catch (error) {
    yield* put(signUpFailed(error as Error));
    console.log(
      'user creation encountered an error',
      error
    );
  }
}

export function* onSignUpStart() {
  yield* takeLatest(
    USER_ACTION_TYPES.SIGN_UP_START,
    signUp
  );
}

export function* onGoogleSignInStart() {
  yield* takeLatest(
    USER_ACTION_TYPES.GOOGLE_SIGN_IN_START,
    signInWithGoogle
  );
}

export function* onSignOutStart() {
  yield* takeLatest(
    USER_ACTION_TYPES.SIGN_OUT_START,
    signOut
  );
}

export function* onEmailSignInStart() {
  yield* takeLatest(
    USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
    signInWithEmailAndPassword
  );
}

export function* onCheckUserSession() {
  yield* takeLatest(
    USER_ACTION_TYPES.CHECK_USER_SESSION,
    isUserAuthenticated
  );
}

export function* userSagas() {
  yield* all([
    call(onCheckUserSession),
    call(onEmailSignInStart),
    call(onGoogleSignInStart),
    call(onSignOutStart),
    call(onSignUpStart)
  ]);
}
