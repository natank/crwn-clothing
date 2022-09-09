import { NextFn, User } from 'firebase/auth';
import React, { createContext, useState,  useEffect} from 'react'
import { createUserDocumentFromAuth, onAuthStateChangedListener } from '../utils/firebase/firebase.utils';

// as the actual value you want to access
type UserContextType = {
  currentUser: User | null,
  setCurrentUser: (user: User) => void
}
export const UserContext = createContext<UserContextType | null>({
  currentUser: null,
  setCurrentUser: () => {return},
});

export const UserProvider = ({children}: {children: any}):any => {
  const [currentUser, setCurrentUser] = useState(null as User | null);
  const value = {currentUser, setCurrentUser};

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(((user: User) => {
      if(user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    }) as NextFn<User | null>)

    return unsubscribe;
  }, [])
  
  return <UserContext.Provider value={value}>
    {children}
  </UserContext.Provider>
}

