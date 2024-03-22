"use client";

import { useRouter } from "next/navigation"; // Importe corretamente o useRouter
import { ReactNode, createContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loading from "./loading";
export const AuthContextApi = createContext({});

interface Ichildren {
  children: ReactNode;
}

export default function AuthProvider({ children }: Ichildren) {
  const router = useRouter();
  const pathName = usePathname();
  const [user, setUser] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true)
    const data = localStorage.getItem("@auth-id");
    if (data) {
      setUser(JSON.parse(data))
      setIsLogin(true);
      if (pathName === "/login" || pathName == "/sing-in") {
        router.push("/");
      }
    } else {
      if (pathName === "/") {
        router.push("/sing-in");
      }
    }
  }, []);

  if(isLoading){
    return <Loading/>
  }


  return (
    <AuthContextApi.Provider value={{user}}>{children}</AuthContextApi.Provider>
  );
}
