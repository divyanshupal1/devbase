
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { Skeleton } from '@/components/ui/Skeleton/Skeleton'
import { DropDown, DropDownHeader,HeaderIcon, DropDownItems, DropItem } from '@/components/ui/Dropdown/Dropdown'
import { UserIcon, ExitIcon, DropDownIcon } from '@/components/Icons/Icons'



export function UserCard() {
    const { data: session } = useSession()
    return (
        <div className="user_info relative w-full flex justify-center">

            <div className='w-full h-full rounded-full  p-2 flex gap-4 relative bg-neutral-800'>
                <div className="user_image h-full w-[40px] bg-black grid place-content-center shrink-0 overflow-hidden rounded-full ">
                    {
                        session?.user?.image ?
                            <Image src={session?.user?.image} width={40} height={40} alt='avatar' />
                            :
                            <Skeleton width="w-[40px]" height="h-[40px]" round="rounded-sm" classes='bg-zinc-700' />
                    }

                </div>
                <div className="use_det h-full w-full overflow-hidden flex flex-col justify-center gap-x-2">
                    {
                        session?.user?.name ?
                            <div className="user_name text-white text-base font-semibold">{session?.user?.name}</div>
                            :
                            <Skeleton width="w-2/3" height="h-4" round="rounded-md" classes='bg-zinc-700' />
                    }

                    {
                        session?.user?.email ?
                            <div className="user_email text-gray-400 text-xs w-full text-ellipsis overflow-hidden whitespace-nowrap">{session?.user?.email}</div>
                            :
                            <Skeleton width="w-10/12" height="h-3" round="rounded-md" classes='bg-zinc-700 mt-2' />
                    }
                </div>

            </div>

        </div>
    )
}
export const Menu = () => {
    return (
        <DropDown>
            <DropDownHeader>
               <HeaderIcon rotate={true}>
                    <DropDownIcon />
               </HeaderIcon>
            </DropDownHeader>
            <DropDownItems>
                <DropItem title='Profile' icon={<UserIcon />} action={() => { }} />
                <DropItem title='Logout' icon={<ExitIcon />} action={() => { signOut() }} />
            </DropDownItems>
        </DropDown>
    )
}