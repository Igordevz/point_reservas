import React, { useContext, useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { instance } from "@/app/api/api";
import { AuthContextApi } from "@/context/Auth-context";

export default function FriendsContent() {
  const { user }: any = useContext(AuthContextApi);
  const [userFriends, setUserFriends] = useState<any[]>([]);

  useEffect(() => {
    async function fetchFriends() {
      if (!user || !user.friends) return;

      const promises = user.friends.map(async (friend: any) => {
        const response = await instance.get(`/friends/${friend.user}`);
        return response.data;
      });

      const friendsData = await Promise.all(promises);
      setUserFriends(friendsData);
    }

    fetchFriends();
  }, [user]);

  return (
    <>
      <div className="flex flex-row m-4 ml-10">
        {userFriends.map((friend, index) => (
          <div key={index} className="flex items-center flex-col cursor-pointer"  >
            <Avatar className="border-[2px] border-red-400" >
              <AvatarFallback>{friend.name[0]}</AvatarFallback>
            </Avatar>
            <h1>{friend?.name}</h1>
          </div>
        ))}
      </div>
    </>
  );
}
