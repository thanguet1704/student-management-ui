import React, { useState } from 'react';

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    name: localStorage.getItem('name'),
    role: localStorage.getItem('role'),
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
