"use client";

import { useRouter } from "next/navigation";
import { ReactNode, createContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loading from "./loading";
import { instance } from "@/app/api/api";
import { toast } from "@/components/ui/use-toast";
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

    const data: any = localStorage.getItem("@auth-id");
    async function LoginUser() {
      const modifieldData = JSON.parse(data);
      const token = modifieldData;
      try {
        const req: any = await instance.post("/get-user", {
          token
        });

        setUser(req);
      } catch (error) {
        return toast({
          title: "Seu Login foi expirado.",
          description: "Realize seu login novamente",
        });
      }
    }

    if (data) {
      LoginUser();
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

  return (
    <AuthContextApi.Provider value={{ user }}>
      {children}
    </AuthContextApi.Provider>
  );
}
