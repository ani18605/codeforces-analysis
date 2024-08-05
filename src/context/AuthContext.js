import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext({
  loggedIn: false,
  setLoggedIn: () => {},
  email: null,
  setEmail: () => {},
  user: null,
  setUser: () => {}
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default function AuthContextProvider({ children }) {
  const [email, setEmail] = useState(() => localStorage.getItem("email") || null);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem("loggedIn") === "true");

  useEffect(() => {
    localStorage.setItem("email", email);
  }, [email]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("loggedIn", loggedIn.toString());
  }, [loggedIn]);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, email, setEmail, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
