import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ name: '', room: '' });
  const [ error, setError ] = useState('');

  return (
    <UserContext.Provider value={{ user, setUser, error, setError }}>
      {children}
    </UserContext.Provider>
  );
};
