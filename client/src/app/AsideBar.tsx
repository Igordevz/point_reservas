"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AuthContextApi } from "@/context/Auth-context";
import {
  BriefcaseMedical,
  HomeIcon,
  LogOut,
  LucideSave,
  Moon,
  Plus,
  Save,
  SaveAll,
  Star,
  TextSearchIcon,
} from "lucide-react";
import { ModeToggle } from "./ThemeMode";
import { Button } from "@/components/ui/button";
export default function AsideBar() {
  const { user, Logout }: any = useContext(AuthContextApi);
  const namePart: any = user?.name.split(" "); // Dividir a string em partes usando um espaço como delimitador
  const twoName = namePart?.slice(0, 2).join(" ");
  const [active, setActive] = useState("home");

  return (
    <aside className="fixed w-[23%] hidden bg-primary-foreground transition-all h-full md:flex flex-col justify-between overflow-hidden hover:w-[30%] ">
      <div>
        <div className="flex flex-row m-4 items-center gap-4">
          <Avatar>
            <AvatarFallback>{user?.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <span className="text-[14px]">{twoName}</span>
            <br />
            <span className="text-[14px] text-muted-foreground">
  <p className="break-words text-ellipsis ">
    {user?.email}
  </p>
</span>
          </div>
        </div>
        <div className="w-full h-[1px] bg-muted-foreground"></div>
        <div className="m-4 flex flex-col">
          <div className="flex flex-row items-center gap-4 cursor-pointer p-3 transition-all text-primary-foreground bg-blue-500  rounded-sm">
            <Plus /> <span>Postar</span>
          </div>
          <br />

          <p className="text-center">Termos de uso.</p>
          <br />
          <a
            href="/home"
            className={`flex flex-row items-center gap-4 cursor-pointer  p-3 transition-all ${
              active == "home" ? "text-blue-500" : ""
            } `}
            onClick={() => {
              setActive("home");
            }}
          >
            <HomeIcon /> <span>Home</span>
          </a>
          <a
            href="/explorer"
            className={`flex flex-row items-center gap-4 cursor-pointer  p-3 transition-all ${
              active == "explorer" ? "text-blue-500" : ""
            } `}
            onClick={() => {
              setActive("explorer");
            }}
          >
            <TextSearchIcon /> <span>Explorer</span>
          </a>
          <a
            href="/salvos"
            className={`flex flex-row items-center gap-4 cursor-pointer  p-3 transition-all ${
              active == "salvos" ? "text-blue-500" : ""
            } `}
            onClick={() => {
              setActive("salvos");
            }}
          >
            <Star /> <span>salvos</span>
          </a>
          <div
            className={`flex flex-row items-center gap-4 cursor-pointer  p-3 transition-all`}
          ></div>
        </div>
      </div>

      <div className="m-4">
        <Button
          onClick={Logout}
          variant={"ghost"}
          className={`flex flex-row items-center   gap-4 cursor-pointer hover:bg-transparent transition-all text-red-500`}
        >
          <LogOut /> <span>Sair</span>
        </Button>
      </div>
    </aside>
  );
}
