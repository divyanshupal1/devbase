
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { Skeleton } from '@/components/ui/Skeleton/Skeleton'
import { DropDown, DropDownHeader,HeaderIcon, DropDownItems, DropItem } from '@/components/ui/Dropdown/Dropdown'
import { UserIcon, ExitIcon } from '@/components/Icons/Icons'



export function UserCard() {
    const { data: session } = useSession()
    return (
        <div className="user_info relative w-full h-20 flex justify-center">

            <div className='w-full h-full rounded-md  p-4 flex gap-4 relative bg-neutral-800'>
                <div className="menu absolute top-2 right-2 z-50">
                    <Menu />
                </div>
                <div className="user_image h-full w-[48px] bg-black grid place-content-center shrink-0 overflow-hidden rounded-full ">
                    {
                        session?.user?.image ?
                            <Image src={session?.user?.image} width={48} height={48} alt='avatar' />
                            :
                            <Skeleton width="w-[50px]" height="h-[50px]" round="rounded-sm" classes='bg-zinc-700' />
                    }

                </div>
                <div className="use_det h-full w-full overflow-hidden">
                    {
                        session?.user?.name ?
                            <div className="user_name text-white text-lg font-semibold">{session?.user?.name}</div>
                            :
                            <Skeleton width="w-2/3" height="h-4" round="rounded-md" classes='bg-zinc-700' />
                    }

                    {
                        session?.user?.email ?
                            <div className="user_email text-gray-400 text-sm w-full text-ellipsis overflow-hidden whitespace-nowrap">{session?.user?.email}</div>
                            :
                            <Skeleton width="w-10/12" height="h-3" round="rounded-md" classes='bg-zinc-700 mt-3' />
                    }
                </div>

            </div>

        </div>
    )
}
const Menu = () => {
    return (
        <DropDown>
            <DropDownHeader>
               <HeaderIcon rotate={true}>
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L7 7L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
               </HeaderIcon>
            </DropDownHeader>
            <DropDownItems>
                <DropItem title='Account' icon={<UserIcon />} action={() => { }} />
                <DropItem title='Logout' icon={<ExitIcon />} action={() => { signOut() }} />
            </DropDownItems>
        </DropDown>
    )
}