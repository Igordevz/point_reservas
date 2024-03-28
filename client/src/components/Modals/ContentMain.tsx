"use client";
import { AuthContextApi } from "@/context/Auth-context";
import React, { useContext, useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Input } from "../ui/input";
import NotificationContainers from "./utils/notification-containers";
import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";
import Posts from "./Posts";
import { ModeToggle } from "@/app/ThemeMode";
export default function ContentMain() {
  const { user }: any = useContext(AuthContextApi);

  return (
    <div className="w-[77%] absolute right-0 ">
      <div className="w-[70%] border-r-[1px] relative">
        <div className="p-4 flex flex-row-reverse items-center justify-between border-b-[1px] w-full ">
          <div className="flex flex-row items-center gap-4">
            <h2 className="font-extrabold">Home</h2>
          <ModeToggle/>
          </div>
          
          <NotificationContainers/>
        </div>
        <div className="flex flex-col border-b-[1px]">
          <div className="p-4 flex flex-row gap-2 items-center">
            <Avatar>
              <AvatarFallback>{user?.name[0]}</AvatarFallback>
            </Avatar>
            <Input
              className="relative w-full"
              placeholder="Crie seu anúncio aqui + Ajuda de uma IA"
            />
            <StarIcon className="absolute right-28 " size={10}/>
            <Button>Gerar</Button>  
          </div>
          <div className=" flex-col py-4 w-full" >
              <Posts/>
          </div>
          {/* <FriendsContent /> */}
        </div>
      </div>
    </div>
  );
}
