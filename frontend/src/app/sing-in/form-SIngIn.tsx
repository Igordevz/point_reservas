"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { instance } from "../api/api";
import { useRouter } from "next/navigation";
export default function FormSingIn() {
  const router = useRouter();
  const { toast } = useToast();

  const createUserSchemaZod = z.object({
    email: z
      .string()
      .nonempty("Preencha o Email")
      .email("Insira o Email válido."),
    name: z
      .string()
      .nonempty("Preencha seu Nome")
      .min(5, "Preencha seu nome completo."),
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
    name: string;
    password: string;
  }

  async function SingIn(data: IData) {
    try {
      const fecthApi = await instance.post("/create_user", {
        email: data?.email,
        name: data?.name,
        password: data?.password,
      });
      toast({
        title: "Cadastrado com sucesso",
        description: "Seu cadastro em nosso sistema foi realizado com sucesso",
      });
      router.push("/sing-in/two-factors")
    } catch (error:any) {
      toast({
        title: "Houve um error",
        description: error?.response?.data?.msg ,
      });
    }
  }
  return (
    <form onSubmit={handleSubmit(SingIn)} className="space-y-3">
      <div className="space-y-1">
        <Label htmlFor="name">Informe seu nome completo.</Label>
        <Input
          placeholder="Ex: Igor Dantas Pereira"
          id="name"
          {...register("name")}
        />
        <span className="text-red-500 text-[12px]">
          {errors?.name?.message}
        </span>
      </div>
      <div className="space-y-1">
        <Label htmlFor="email">Informe seu email.</Label>
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
        <Label htmlFor="password">Informe sua senha</Label>
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
        Realizar cadastro <ArrowRight />
      </Button>
    </form>
  );
}
