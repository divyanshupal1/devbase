"use client"

import { useState} from 'react'
import { signOut, useSession } from 'next-auth/react'
import { UserCard } from '@/components/ui/UserCard/Usercard'

export default function Navigationpanel() {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)
  return (
    <>
    <div className="hamburger hidden flex-col space-y-2 w-[36px] mb-5 max-sm:flex fixed top-[20px] left-[20px] z-50" onClick={()=>setOpen(!open)}>
      <svg width={"36px"} height={"36px"} viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.57495 7H19.575" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1.57495 1H19.575" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1.57495 13H19.575" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>      
    </div>
    
    <div className={`w-96 h-screen sm:w-80 max-sm:absolute max-sm:pt-16 transition-all ${open?'':'max-sm:translate-x-[-100%]'} bg-black border-r-2 border-zinc-700 top-0 pt-8 p-4 `} > 
       <UserCard/>
    </div>
    </>
  )
}
