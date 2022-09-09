import { createContext, useState } from 'react'

// as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: (user: any) => null,
});

export const UserProvider = ({children}: {children: any}):any => {
  const [currentUser, setCurrentUser] = useState(null);
  const value: {currentUser: any, setCurrentUser: any} = { currentUser, setCurrentUser }
  return <UserContext.Provider value={value}>
    {children}
  </UserContext.Provider>
}

