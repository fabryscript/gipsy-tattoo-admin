import { createContext, FC, useEffect, useState } from "react";
import { _auth } from "../utils/firebase/firebase";

export const UserContext = createContext<any>(null)

export const GAuthProvider: FC = ({ children }) => {
  const [actualUser, setActualUser] = useState<any>(null);

  useEffect(() => {
    _auth.onAuthStateChanged((user) => {
      setActualUser(user)
    })
  }, [actualUser])
  
  return (
    <UserContext.Provider value={{ actualUser }}>
      { children }
    </UserContext.Provider>
  )
}