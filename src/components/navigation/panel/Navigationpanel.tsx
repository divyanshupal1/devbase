"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { Skeleton } from '@/components/ui/skeleton/Skeleton'
import { motion, Variants } from "framer-motion";

export default function Navigationpanel() {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)
  return (
    <>
    <div className="hamburger hidden flex-col space-y-2 w-[36px] mb-5 max-sm:flex fixed top-[20px] left-[20px] z-50" onClick={()=>setOpen(!open)}>
          <div className="hamburger_line h-1 w-full bg-white rounded-lg"></div>
          <div className="hamburger_line h-1 w-full bg-white rounded-lg"></div>
          <div className="hamburger_line h-1 w-full bg-white rounded-lg"></div>
        </div>
    <div className={`w-96 h-screen sm:w-80 max-sm:absolute max-sm:pt-16 transition-all ${open?'':'max-sm:translate-x-[-100%]'} bg-black border-r-2 border-zinc-700 top-0 pt-8 p-4 `} > 
       <UserCard/>
        <div className="menu_list w-full h-full flex flex-col justify-start items-start pl-2 my-10 gap-x-2">
            <MenuItem title='Dashboard' toggle={()=>{}}/>
            <MenuItem title='Sheets' toggle={()=>{}}/>
        </div>
     

    </div>
    </>
  )
}



export  function UserCard() {
  const { data: session } = useSession()
  return (    
    <div className="user_info relative w-full h-20 flex justify-center">

      <div className='w-full h-full rounded-md  p-4 flex gap-4 relative bg-neutral-800'>
        <div className="menu absolute top-2 right-2 z-50">
          <Menu/>
        </div>
        <div className="user_image h-full w-[48px] bg-black grid place-content-center shrink-0 overflow-hidden rounded-full ">
          {
            session?.user?.image ?
            <Image src={session?.user?.image} width={48} height={48} alt='avatar' /> 
            :
            <Skeleton width="w-[50px]" height="h-[50px]" round="rounded-sm" classes='bg-zinc-700'/>
          }
        
        </div>
        <div className="use_det h-full w-full overflow-hidden">
            {
                session?.user?.name ?
                <div className="user_name text-white text-lg font-semibold">{session?.user?.name}</div>
                :
                <Skeleton width="w-2/3" height="h-4" round="rounded-md" classes='bg-zinc-700'/>
            }   
              
            {
                session?.user?.email ?
                <div className="user_email text-gray-400 text-sm w-full text-ellipsis overflow-hidden whitespace-nowrap">{session?.user?.email}</div>
                :
                <Skeleton width="w-10/12" height="h-3" round="rounded-md" classes='bg-zinc-700 mt-3'/>
            }      
        </div> 
        
      </div>
    
    </div>
  )
}






export const Menu = () => {
  const itemVariants: Variants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
  };
  const [open, setOpen] = useState(false)
  function toggle(){
    setOpen(!open)
  }
  return (
    <motion.div 
      className='relative ml-56 grow-0'
      initial={false}
      animate={open ? "open" : "closed"}
    >
       <motion.button
          initial={false}
          animate={open ? "open" : "closed"}
          whileTap={{ scale: 0.97 }}
          onClick={() => toggle()}
          className={`text-white  w-10 h-10 flex justify-center items-center rounded-md border-2 hover:bg-zinc-900  ${open ? 'border-zinc-700 bg-zinc-900 ' :'border-transparent'}`}
        >
            <motion.div
              variants={{
                open: { rotate: 180 },
                closed: { rotate: 0 }
              }}
              transition={{ duration: 0.2 }}
              style={{ originY: 0.55 }}
            >
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L7 7L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              
            </motion.div>
        </motion.button>

        <motion.div 
          className={`absolute top-[120%] right-[0%] w-44 h-fit p-2 bg-zinc-900 rounded-md drop-shadow-2xl border-2 border-zinc-700`}        
          variants={{
            open: {
              clipPath: "inset(0% 0% 0% 0% round 0px)",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.7,
                delayChildren: 0.3,
                staggerChildren: 0.05
              }
            },
            closed: {
              clipPath: "inset(0% 0% 100% 100% round 10px)",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.3
              }
            }
          }}
        >
          <MenuItem variants={itemVariants} toggle={toggle} title='Account'/>
          <MenuItem variants={itemVariants} toggle={()=>{setOpen(!open);signOut()}} title='Logout'/>
        </motion.div>  

    </motion.div>
  )
}

const MenuItem = ({title,variants,toggle}:{title:string,variants?:{},toggle:()=>void}) => {
  return (
    <motion.div onClick={()=>toggle()} variants={variants} className='w-full px-2 py-2 text-slate-100 hover:bg-zinc-800 rounded-md cursor-pointer'>
      {title}
    </motion.div>
  )
}
