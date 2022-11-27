import {
  signInSuccess,
  signInFailed,
  signOutSuccess
} from './user.action';
import { AnyAction } from 'redux';
import { UserData } from '../../utils/firebase/firebase.utils';

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null
};

export function userReducer(
  state = INITIAL_STATE,
  action = {} as AnyAction
): UserState {
  if (signInSuccess.match(action)) {
    const { payload } = action;
    return {
      ...state,
      currentUser: payload
    };
  }

  if (signInFailed.match(action)) {
    const { payload } = action;
    return { ...state, error: payload };
  }

  if (signOutSuccess.match(action)) {
    return {
      ...state,
      currentUser: null
    };
  }
  return state;
}
