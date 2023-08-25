"use client"

import { useState ,useEffect} from 'react'
import Image from 'next/image'
import {useSession} from 'next-auth/react'
export default function Navigationpanel() {

  const {data: session} = useSession()

  return (
    <div className="w-80 max-sm:w-full" style={{height:"100vh",background:"hsl(210,0%,5%)",position:"absolute"}}>
        
    </div>
  )
}
