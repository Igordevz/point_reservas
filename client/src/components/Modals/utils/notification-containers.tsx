import React, { useContext } from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { BellIcon } from "@radix-ui/react-icons";
import { AuthContextApi } from '@/context/Auth-context';
import { Avatar, AvatarFallback } from "../../ui/avatar";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "../../ui/button";
import { instance } from '@/app/api/api';
import { toast } from '../../ui/use-toast';
export default function NotificationContainers() {
  const { user }: any = useContext(AuthContextApi);
  async function AcceptUser(data: any) {
    try {
      await instance.put("/accept", {
        type: "invite",
        id: data?.id_user,
        token: user?.access_jwt,
      });
      toast({
        title: "Um novo amigo adicionado",
        description: `${data.name} é seu novo amigo`,
      });
    } catch (error: any) {
      toast({
        title: "Error na requisição",
        description: `${error?.response?.data.msg}`,
      });
    }
  }
  return (
    <NavigationMenu className="w-full">
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>
          <BellIcon
            className={user?.notification[0] ? "text-primary" : ""}
          />
          {user?.notification[0] ? (
            <div className="mt-[-10px] text-primary">+1</div>
          ) : (
            ""
          )}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuLink className="">
            {user?.notification.map((file: any) => {
              return (
                <>
                  <Alert className="w-[auto] min-w-[500px] p-5">
                    <AlertTitle>{file.title}</AlertTitle>
                    <AlertDescription>
                      <div className="flex flex-row pt-3 gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {file.name[0]}
                          </AvatarFallback>
                        </Avatar>{" "}
                        {file?.description}
                      </div>
                      {file?.type == "invite" ? (
                        <div className="space-x-1 flex flex-row   justify-end">
                          <Button
                            variant="secondary"
                            onClick={() => AcceptUser(file)}
                          >
                            Aceitar
                          </Button>
                          <Button variant="destructive">Recusar</Button>
                        </div>
                      ) : (
                        ""
                      )}
                    </AlertDescription>
                  </Alert>
                </>
              );
            })}
            {!user?.notification[0] ? (
              <>
                <Alert className="w-[auto]  min-w-[500px] p-5">
                  <AlertTitle>
                    Você não tem nenhuma notificação{" "}
                  </AlertTitle>
                </Alert>
              </>
            ) : (
              ""
            )}
          </NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
  )
}
