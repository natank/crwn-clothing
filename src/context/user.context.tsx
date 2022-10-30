// @ts-nocheck
import { NextFn, User } from 'firebase/auth';
import {
  createContext,
  useEffect,
  useReducer
} from 'react';
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener
} from '../utils/firebase/firebase.utils';

// as the actual value you want to access
type UserContextType = {
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
};
export const UserContext =
  createContext<UserContextType | null>({
    currentUser: null,
    setCurrentUser: () => {
      return;
    }
  });

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        currentUser: payload
      };
    default:
      throw new Error(
        `Unhandled type ${type} in userReducer`
      );
  }
};

const INITIAL_STATE = {
  currentUser: null
};

export const UserProvider = ({
  children
}: {
  children: any;
}): any => {
  const [{ currentUser }, dispatch] = useReducer(
    userReducer,
    INITIAL_STATE
  );
  const setCurrentUser = (user) => {
    dispatch({
      type: USER_ACTION_TYPES.SET_CURRENT_USER,
      payload: user
    });
  };

  const value = { currentUser, setCurrentUser };
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(((
      user: User
    ) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    }) as NextFn<User | null>);

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
