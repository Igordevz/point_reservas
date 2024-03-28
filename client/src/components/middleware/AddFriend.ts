import { instance } from '@/app/api/api';
import { AuthContextApi } from '@/context/Auth-context';
import { useContext } from 'react';
import { toast } from '../ui/use-toast';
export async function AddFriends(email:string, token:string){
 
  try {
    const data = await instance.put("/add", {
      token,
      email
    })
    toast({
      title: "Pedido de amizade enviado",
      description: "Esperando a aprovação para ser amigos."
    })
  } catch (error:any) {
    toast({
      title: "Não podemos enviar o seu pedido.",
      description: error?.response?.data?.msg || "Não conseguimos identificar o error."
    })
  }

}