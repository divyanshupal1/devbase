"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
export default function Navigationpanel() {

  const { data: session } = useSession()

  return (
    <div className="w-96 h-screen sm:w-72 max-sm:absolute bg-black border-r-2 border-zinc-700 top-0 pt-8 " >

       <UserCard user={session?.user}/>
       <Skeleton width="w-11/12" height="h-10" round="rounded-md" classes='mx-auto mt-5'/>
      {/* <div className="user h-20 w-full flex justify-center pt-10">

        
      </div> */}

    </div>
  )
}

import { Skeleton } from '@/components/ui/skeleton/Skeleton'

export  function UserCard({user}:{user:any}) {
  return (
    
    <div className="user_info relative w-full h-20 flex justify-center">
    <div className='w-11/12 h-full rounded-md bg-zinc-900 hover:bg-zinc-800 p-4 flex gap-4'>
      <div className="user_image h-full w-[48px] bg-black grid place-content-center shrink-0 overflow-hidden rounded-full ">
        <Image src={user?.image} width={48} height={48} alt='avatar' />
      </div>
      <div className="use_det h-full w-full overflow-hidden">
        <div className="user_name text-white text-lg font-semibold">{user?.name}</div>
        <div className="user_email text-gray-400 text-sm w-full text-ellipsis overflow-hidden whitespace-nowrap">{user?.email}</div>
      </div> 

    </div>
</div>
  )
}
