import { instance } from '@/app/api/api';
import { AuthContextApi } from '@/context/Auth-context';
import { useContext } from 'react';
export async function AddFriends(emailUser:string, token:string){
  console.log(token)
  const data = instance.put("/add", {

  })

}