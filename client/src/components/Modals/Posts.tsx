import { instance } from "@/app/api/api";
import React, { useContext, useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { MoreVertical, UserRoundPlus, Verified } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { Button } from "../ui/button";
import { AddFriends } from "../middleware/AddFriend";
import { AuthContextApi } from "@/context/Auth-context";
function Post({ post }: any) {
  const [userPropietary, setUserPropietary] = useState<any | undefined>([]);
  const {user}:any = useContext(AuthContextApi)
  useEffect(() => {
    async function fetchUserPropietary() {
      try {
        const response = await instance.get(`/friends/${post.admin_id}`);
        setUserPropietary(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    }
    fetchUserPropietary();
  }, [post.admin_id]);

  return (
    <div key={post.id}>
      <div className="flex flex-row gap-2 py-2 justify-between items-center">
       <div className="flex flex-row gap-2 py-2">
       <Avatar>
          <AvatarFallback>
            {userPropietary && userPropietary.name && userPropietary.name[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <span>{userPropietary?.name}</span>
          <p className="text-muted-foreground text-[12px]">
            {userPropietary?.email}
          </p>
        </div>
       </div>
       <div>
          <Button variant="ghost" onClick={() => AddFriends(userPropietary?.email, user.access_jwt)}>
            <UserRoundPlus/>

          </Button>
       </div>
      </div>
    <div className="h-full relative">
    <Carousel>
        <CarouselNext className="absolute right-0 bottom-0 z-10 bg-purple-900 border-purple-900 text-white"/>
        <CarouselPrevious className="absolute left-0 bottom-0 z-10 bg-purple-900 border-purple-900 text-white"/>
        <CarouselContent>
      {post.photo_point.map((img: any, index: any) => (
        
        <CarouselItem>
 <img
          key={index}
          src={`http://localhost:8080/${img}`}
          alt="post"
          className="rounded w-[100%]"
        />
        </CarouselItem>
       
      ))}
    
           </CarouselContent>
      </Carousel>
      <h1 className="text-[20px] mt-2 font-bold">{post.title}</h1>
      <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-muted-foreground mt-[-5px]">Descrição</AccordionTrigger>
        <AccordionContent>
        <pre
        className="break-words text-[14px] text-muted-foreground"
        style={{ whiteSpace: "pre-line", fontFamily: "sans-serif" }}
      >
        {post.description}
      </pre>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    
    </div>
    </div>
  );
}

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function FetchApi() {
      try {
        const fecth = await instance.get("/posts");
        setPosts(fecth.data);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      }
    }
    FetchApi();
  }, []);

  return (
    <div className="w-full ">
      {posts?.map((post: any) => (
        <>
          <div className="w-full border-[1px]"> 
            <div className="p-4">
            <Post key={post.id} post={post} />
            </div>
          </div>
        </>
      ))}
    </div>
  );
}
