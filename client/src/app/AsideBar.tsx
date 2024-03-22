"use client"
import React, { useContext } from 'react'
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AuthContextApi } from '@/context/Auth-context';

export default function AsideBar() {

  const {user}:any = useContext(AuthContextApi)
  console.log(user)
  return (
    <aside>
        <div>
          <Avatar>
            <AvatarImage src="https://github.com/igordevz.png" alt="@shadcn" />
            <AvatarFallback>{user?.name}</AvatarFallback>
          </Avatar>
          <h1>{}</h1>
        </div>
      </aside>
  )
}
