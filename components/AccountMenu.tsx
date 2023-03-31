/* eslint-disable @next/next/no-img-element */
import { signOut } from 'next-auth/react';
import React from 'react';

import useCurrentUser from '@/hooks/useCurrentUser';

interface AccountMenuProps {
    visible?: boolean;
}

export const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
    const { data: currentUser } = useCurrentUser();

    return (
        <div className={`bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex ${visible ? "scale-100 translate-y-0 opacity-100" : "scale-0 -translate-y-[100vh] opacity-0"} transition-all duration-300 ease-in-out`}>
            <div className="flex flex-col gap-3">
                <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
                    <img className="w-8 rounded-md" src="/images/default-blue.png" alt="" />
                    <p className="text-white text-sm group-hover/item:underline">{currentUser?.name}</p>
                </div>
            </div>
            <hr className="bg-gray-600 border-0 h-px my-4" />
            <div onClick={() => signOut()} className="px-3 text-center text-white text-sm hover:underline">
                Sign out
            </div>
        </div>
    )
}