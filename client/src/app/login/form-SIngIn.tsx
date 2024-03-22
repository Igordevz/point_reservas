"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";

import { useToast } from "@/components/ui/use-toast";
import { instance } from "../api/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import BarLoader from "react-spinners/BarLoader";
export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const createUserSchemaZod = z.object({
    email: z
      .string()
      .nonempty("Preencha o Email")
      .email("Insira o Email válido."),
    password: z
      .string()
      .nonempty("Preencha sua Senha")
      .min(8, "Sua senha deve conter no mínimo 8 dígitos."),
  });

  type createTypeUser = z.infer<typeof createUserSchemaZod>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createTypeUser>({
    resolver: zodResolver(createUserSchemaZod),
  });

  interface IData {
    email: string;
    password: string;
  }

  async function Login(data: IData) {
    setLoading(true);
    try {
      const fecthApi = await instance.post("/login", {
        email: data?.email,
        password: data?.password,
      });
      toast({
        title: "Login Realizado Com Sucesso",
      });
      const expirationTimeInDays = 7;
      const expires = new Date();
      expires.setDate(expires.getDate() + expirationTimeInDays);
      Cookies.set("@auth-id", fecthApi?.data.access_jwt, { expires });
      location.reload();
    } catch (error: any) {
      toast({
        title: "Houve um problema no seu login",
        description: error?.response?.data?.msg,
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <form onSubmit={handleSubmit(Login)} className="space-y-3">
      <div className="space-y-1">
        <Label htmlFor="email">Seu email.</Label>
        <Input
          placeholder="Ex: igordantas133@gmail.com"
          id="email"
          {...register("email")}
        />
        <span className="text-red-500 text-[12px]">
          {errors?.email?.message}
        </span>
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Sua senha</Label>
        <Input
          placeholder="Ex: ********"
          id="password"
          type="password"
          {...register("password")}
        />
        <span className="text-red-500 text-[12px]">
          {errors?.password?.message}
        </span>
      </div>

      <Button type="submit" className="w-full flex flex-row gap-4">
        {loading ? (
          <BarLoader width={"90%"} height={2} color="yellow" />
        ) : (
          "Entrar"
        )}
      </Button>
      <p className="text-[13px] text-center">
        Se você não tem usuário cadastrado{" "}
        <a href="/sing-in" className="underline">
          clique aqui
        </a>
      </p>
    </form>
  );
}
