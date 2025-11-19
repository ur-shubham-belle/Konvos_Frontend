import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Will store { id, username }
  const [token, setToken] = useState(null);

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    // In real app, save to localStorage here
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    // In real app, remove from localStorage here
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
