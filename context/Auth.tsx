import { FIREBASE_AUTH } from '@/FirebaseConfig';
import { User, onAuthStateChanged } from 'firebase/auth';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

interface AuthProps {
  user?: User;
  initialized?: boolean;
}

const AuthContext = createContext<AuthProps>({});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>();
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {      
      setUser(user || undefined);
      setInitialized(true);
    });
  }, []);

  return <AuthContext.Provider value={{ user, initialized }}>{children}</AuthContext.Provider>;
};