"use client"
import { Button } from "@/components/ui/button";
import BarLoader from "react-spinners/BarLoader";


import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { instance } from "@/app/api/api";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function Twofactors() {
  const [codding, setCodding] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function ValidatorToken() {
    setLoading(true)
    try {
      const validator = await instance.put("/validator", {
        token: codding
      })
      toast({
        title: "Sobre a Validação",
        description: "Validação realizada com sucesso"
      })
      router.push("/")
      location.reload();
    } catch (error:any) {
      toast({
        title: "Sobre a Validação",
        description: error?.response?.data?.msg
      })
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-10">
      <div className="flex flex-col justify-center gap-2">
      <h1 className="text-[25px] sm:text-4xl">Digíte o código que chegou no seu email</h1>
      <p className=" text-[15px] text-zinc-400">Não chegou nenhum email? <a className="text-yellow-600 underline" href="/sing-in">Refaça seu cadastro verificando seu email</a> ou entre em contato com o <a className="text-yellow-600 underline" href="/suport">Suporte</a></p>
        <div className="flex flex-col gap-2 w-[24%]" >
        <InputOTP maxLength={6} onChange={(e) => setCodding(e) }>
          <InputOTPGroup className="flex flex-row">
            <InputOTPSlot index={0} />
            <InputOTPSeparator/>
            <InputOTPSlot index={1} />
            <InputOTPSeparator/>

            <InputOTPSlot index={2} />
            <InputOTPSeparator/>

            <InputOTPSlot index={3} />
            <InputOTPSeparator/>

            <InputOTPSlot index={4} />
          </InputOTPGroup>
        </InputOTP>{" "}
        <Button onClick={ValidatorToken}>{loading ? <BarLoader  width={"90%"} height={2} color="yellow"/>  : "Confirmar Token"}</Button>
        </div>
      </div>

    </div>
  );
}
