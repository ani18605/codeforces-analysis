import { createContext, useContext, useState, ReactNode } from "react";


export const AuthContext = createContext({});


export const useAuthContext = () => {
  return useContext(AuthContext);
};


// Create the provider component
export default function AuthContextProvider({
  children,
}) {
  const isLoggedin = localStorage.getItem("loggedIn") || false;
  const [email , setEmail] = useState(localStorage.getItem("email"));
  const [user , setuser] = useState(localStorage.getItem("user"))

  const [loggedIn, setLoggedIn] = useState(isLoggedin === "true");

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn , email , setEmail  , user , setuser }}>
      {children}
    </AuthContext.Provider>
  );
}