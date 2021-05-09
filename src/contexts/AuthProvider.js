import React, { useState } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    name: decodeURIComponent(Cookies.get('name')),
    role: Cookies.get('role'),
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
