"use client"

import Image from 'next/image'
import { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { UserCard } from '@/components/ui/UserCard/Usercard'
import { DropDown, DropDownHeader,HeaderIcon, DropDownItems, DropItem } from '@/components/ui/Dropdown/Dropdown'
import { UserIcon, ExitIcon, DropDownIcon } from '@/components/Icons/Icons'
import {GoGear} from 'react-icons/go'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


export default function Navigationpanel() {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)
  return (

    <>
      <div className="top hidden fixed top-0 left-0 z-50 w-screen max-md:flex items-center justify-between">
        <div className="left flex items-center p-4 text-white ">
          <div className="hamburger flex flex-col space-y-2 w-[36px]" onClick={() => setOpen(!open)}>
            <svg width={"36px"} height={"36px"} viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.57495 7H19.575" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M1.57495 1H19.575" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M1.57495 13H19.575" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>           
          </div>
          <div className='text-2xl font-bold grid place-content-center ml-5'>DEvbase</div>
        </div>
        {/* <div className="right h-[36px] w-[36px] rounded-full overflow-hidden mr-4 flex items-center justify-center" > */}
          <Menu>
              {session?.user.image ? <Image src={session?.user?.image} alt='user-logo' width={40} height={40}/>:<UserIcon/>}
          </Menu>
        {/* </div> */}

      </div>

      <div className={`rounded-tr-3xl rounded-br-3xl flex flex-col w-full max-w-sm h-screen sm:w-72 sm:max-w-ful max-md:absolute max-md:pt-16 transition-all ${open ? '' : 'max-md:translate-x-[-100%]'} bg-black border-r-2 border-zinc-900 top-0 pt-8 p-4 `} >
        <UserCard />
        <div className='w-full h-full mt-6 flex items-end'>
          <div className='w-full flex items-center justify-center gap-x-4'>
              <div className='w-full text-white p-3 bg-neutral-950 hover:bg-neutral-800 rounded-full text-center cursor-pointer' onClick={()=>signOut()}>SignOut</div>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                  <div className=' text-white p-4  rounded-full text-center hover:animate-spin cursor-pointer '>
                    <GoGear fill="white" className="scale-150"/>
                  </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Open Settings</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              
          </div>
        </div>
      </div>
    </>
  )
}
export const Menu = ({children}:{children:React.ReactNode}) => {
  return (
      <DropDown className='p-0 gap-x-0'>
          <DropDownHeader openClasses='border-transparent bg-transparent' className='hover:bg-none rounded-[999px] overflow-hidden p-0 h-[40px] w-[40px] '>
             <HeaderIcon>
                  {children}
             </HeaderIcon>
          </DropDownHeader>
          <DropDownItems>
              <DropItem title='Profile' icon={<UserIcon />} action={() => { }} />
              <DropItem title='Logout' icon={<ExitIcon />} action={() => { signOut() }} />
          </DropDownItems>
      </DropDown>
  )
}