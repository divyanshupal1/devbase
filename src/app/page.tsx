"use client"
import { useState ,useEffect} from 'react'
import Image from 'next/image'
import {signIn, signOut, useSession,getProviders } from 'next-auth/react'

export default function Home() {
  const {data: session} = useSession()
  const [providers, setProviders] = useState<any>(null);
  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
      console.log(res)
    })();
  }, []);

  console.log(session?.user)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold text-center">Hello</h1>
       {session?.user ? 
       <>
       <Image src={session?.user.image} alt='user-logo' width={30} height={30}/>
       <button onClick={()=>signOut()}>SignOut</button>
       </> 
       :
       <>
        {providers && Object.values(providers).map((provider:any) => (
          <button
            className="logout-text container"
            style={{margin:"0px"}}
            key={provider.name}
            onClick={() => signIn(provider.id,{callbackUrl:process.env.NEXTAUTH_URL},{scope:"openid profile email"})}
            >
            SignIn {provider.name}           
            </button>
        ))}
       </>
       }
       {session?.user && <div className="text-2xl font-bold text-center">Welcome {session?.user.name}</div>}
       {session?.user && 
       <>{providers && Object.values(providers).map((provider:any) => (
          <button
            className="logout-text container"
            style={{margin:"0px"}}
            key={provider.name}
            onClick={() => signIn(provider.id,{callbackUrl:process.env.NEXTAUTH_URL},{scope:"openid profile email https://www.googleapis.com/auth/spreadsheets"})}
            >
            Auth Sheets        
            </button>
        ))}
        </>
       }
    </main>
  )
}
