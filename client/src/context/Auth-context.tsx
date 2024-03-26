"use client";

import { useRouter } from "next/navigation";
import { ReactNode, createContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loading from "./loading";
import { instance } from "@/app/api/api";
import { toast } from "@/components/ui/use-toast";
import Cookies from 'js-cookie';

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
    setIsLoading(true);
    const token = Cookies.get('@auth-id');
    async function GetInformationUser() {
      try {
        const req: any = await instance.post("/get-user", {
          token
        });

        setUser(req?.data);
      } catch (error) {
        Cookies.remove('@auth-id');
        location.reload();
        return toast({
          title: "Seu Login foi expirado.",
          description: "Realize seu login novamente",
        });
      }
    }

    if(token) {
      GetInformationUser();
      setIsLogin(true);
      if (pathName === "/login" || pathName == "/sing-in") {
        router.push("/");
      }
    } else {
      if (pathName === "/") {
        router.push("/sing-in");
      }
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  function Logout(){
    setIsLoading(true)
    const removeCookies = Cookies.remove("@auth-id")
    setIsLoading(false)
    toast({
      title: "Você foi desconectado",
      description: "Por favor, faça o login novamente. "
    })
    location.reload();
  }
  return (
    <AuthContextApi.Provider value={{ user, Logout }}>
      {children}
    </AuthContextApi.Provider>
  );
}
