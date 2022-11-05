// @ts-nocheck
import {
  call,
  takeLatest,
  put,
  all
} from 'redux-saga/effects';
import {
  signInWithGooglePopup,
  signOutUser
} from '../../utils/firebase/firebase.utils';
import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';

import {
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutSuccess,
  signUpFaled,
  signUpSuccess
} from './user.action';

import { USER_ACTION_TYPES } from './user.types';

export function* getSnapshotFromUserAuth(
  userAuth,
  additionalDetails
) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );
    yield put(
      signInSuccess({
        id: userSnapshot.id,
        ...userSnapshot.data
      })
    );
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth: unknown = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

function* signInWithGoogle() {
  getCurrentUser();
  try {
    const user = yield call(signInWithGooglePopup);
    const userDoc = createUserDocumentFromAuth(user);
    yield put(signInSuccess(userDoc));
  } catch (error) {
    switch (error.code) {
      case 'auth/user-not-found':
        alert('no user associated with this email');
        break;
      default:
        console.log(error);
    }
  }
}

function* signInWithEmailAndPassword({
  payload: { email, password }
}) {
  try {
    getCurrentUser();
    const user = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    const userDoc = yield call(
      createUserDocumentFromAuth,
      user
    );
    yield put(signInSuccess(userDoc));
  } catch (error: any) {
    switch (error.code) {
      case 'auth/wrong-password':
        alert('incorrect password form email');
        break;
      case 'auth/user-not-found':
        alert('no user associated with this email');
        break;
      default:
        console.log(error);
    }
  }
}

function* signOut() {
  try {
    yield signOutUser();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed());
  }
}

function* signUp({ payload: { email, password } }) {
  try {
    const userCredential = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    const { user } = userCredential || { user: null };

    user && (yield call(createUserDocumentFromAuth, user));
    yield put(signUpSuccess());
  } catch (error) {
    yield put(signUpFaled(error));
    console.log(
      'user creation encountered an error',
      error
    );
  }
}

export function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onGoogleSignInStart() {
  yield takeLatest(
    USER_ACTION_TYPES.GOOGLE_SIGN_IN_START,
    signInWithGoogle
  );
}

export function* onSignOutStart() {
  yield takeLatest(
    USER_ACTION_TYPES.SIGN_OUT_START,
    signOut
  );
}

export function* onEmailSignInStart() {
  yield takeLatest(
    USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
    signInWithEmailAndPassword
  );
}

export function* onCheckUserSession() {
  yield takeLatest(
    USER_ACTION_TYPES.CHECK_USER_SESSION,
    isUserAuthenticated
  );
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onEmailSignInStart),
    call(onGoogleSignInStart),
    call(onSignOutStart),
    call(onSignUpStart)
  ]);
}
