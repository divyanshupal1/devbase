"use client"
import { useState ,useEffect} from 'react'
import Image from 'next/image'
import {signIn, signOut, useSession,getProviders } from 'next-auth/react'
import { DropDown, DropDownHeader,HeaderIcon, DropDownItems, DropItem, HeaderTitle } from '@/components/ui/Dropdown/Dropdown'
import { UserIcon, ExitIcon } from '@/components/Icons/Icons'
import { Backdrop } from '@/components/ui/Backdrop/Backdrop'

export default function Home() {
  const {data: session} = useSession()
  const [providers, setProviders] = useState<any>(null);
  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
      // console.log(res)
    })();
  }, []);

  // console.log(providers)

  return (
    <main className="h-screen flex-col">
      {/* <Navigationpanel/> */}
      <h1 className="text-6xl font-bold text-center text-gray-50">Hello {session?.user.name},</h1>
       {session?.user ? 
       <>
       <Image src={session?.user.image} alt='user-logo' width={30} height={30}/>
       <button className='text-black bg-white  px-7 py-2 rounded-lg text-lg' onClick={()=>signOut()}>SignOut</button>
       </> 
       :
       <>
        {providers && Object.values(providers).map((provider:any) => (
          <button
            className='text-black text-lg bg-white px-6 py-4 rounded-md flex items-center gap-x-4 hover:bg-gray-100'
            style={{margin:"0px"}}
            key={provider.name}
            onClick={() => signIn(provider.id,{callbackUrl:process.env.NEXTAUTH_URL},{scope:"openid profile email"})}
            >
            <Image src={provider?.id === "google" ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjzC2JyZDZ_RaWf0qp11K0lcvB6b6kYNMoqtZAQ9hiPZ4cTIOB" : "/github.svg"} alt='user-logo' width={30} height={30} style={{width:"auto",height:"auto"}}/>
            Sign in with {provider.name}           
            </button>
        ))}
       </>
       }
       {session?.user && 
       <>{providers && Object.values(providers).map((provider:any) => (
          <button
           className='text-black bg-white  px-7 py-2 rounded-lg text-lg'
            style={{margin:"0px"}}
            key={provider.name}
            onClick={() => signIn(provider.id,{callbackUrl:process.env.NEXTAUTH_URL},{scope:"openid profile email https://www.googleapis.com/auth/spreadsheets"})}
            >
            Auth Sheets        
            </button>
        ))}
        </>
       }
       <div className='grow-0 w-fit'>
       
       </div>

      
    </main>
  )
}
