'use client';

import { useRouter } from 'next/navigation'; // Importe corretamente o useRouter
import { ReactNode, createContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
export const AuthContextApi = createContext({});

interface Ichildren {
  children: ReactNode;
}

export default function AuthProvider({ children }: Ichildren) {
  const router = useRouter();
  const pathName = usePathname();
  const [user, setUser] = useState();
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const data = localStorage.getItem('@auth-id');
    if (data) {
      setIsLogin(true);
    } else {
      if (pathName === '/') {
        router.push('/sing-in');
      }
    }
    console.log(data);
  }, []);

  return (
    <AuthContextApi.Provider value={{}}>
      {children}
    </AuthContextApi.Provider>
  );
}
