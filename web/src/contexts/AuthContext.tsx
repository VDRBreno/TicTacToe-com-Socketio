import { createContext, ReactNode, useState } from 'react';

import { Socket } from 'socket.io-client';

interface AuthContextProps {
  isAuthenticated: boolean;
  signIn: () => void;
}

interface AuthContextProviderProps {
  children: ReactNode;
  socket: Socket;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({
  children,
  socket
}: AuthContextProviderProps) {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function signIn() {
    setIsAuthenticated(true);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}