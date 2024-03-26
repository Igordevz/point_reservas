"use client"
import { AuthContextApi } from '@/context/Auth-context';
import React, { useContext } from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { BellIcon } from "@radix-ui/react-icons"
export default function ContentMain() {
  const { user}: any = useContext(AuthContextApi);

  return (
    <div className='w-[77%] absolute right-0 '>
      <div className='w-[70%] border-r-[1px]'>
        <div className='p-4 flex flex-row justify-between border-b-[1px] '>
          <h2 className='font-extrabold'>Home</h2>
          <Button variant="ghost">
            <BellIcon/>
          </Button>
        </div>
        <div className='flex flex-col'>
          <div className='p-4 flex flex-row gap-2 '>
            <Avatar>
              <AvatarFallback>{user?.name[0]}</AvatarFallback>
            </Avatar>
            <Input className='border-none focus:ring-0 focus:border-transparent' placeholder='Procurar por amigos...' />
          </div>
        </div>
      </div>
    </div>
  )
}