import React, { useState } from 'react';

export const AuthContext = React.createContext(null);

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ name: '', role: '' });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
