/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useState } from "react";
import { BellIcon, MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

import {
    AccountMenu,
    MobileMenu,
    NavbarItem
} from '.';
import { useRouter } from "next/router";

const TOP_OFFSET = 66;

export const Navbar = () => {
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showBackground, setShowBackground] = useState(false);

    const router = useRouter()

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= TOP_OFFSET) {
                setShowBackground(true)
            } else {
                setShowBackground(false)
            }
        }
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }

    }, [])

    const toggleAccountMenu = useCallback(() => {
        setShowAccountMenu((current) => !current)
        setShowMobileMenu(false)
    }, [])

    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current)
    }, [])

    const handleNavigation = useCallback((to: string) => {
        router.push(to)
    }, [router])

    return (
        <nav className="w-full fixed z-40">
            <MobileMenu visible={showMobileMenu} toggleVisible={toggleMobileMenu} />
            <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${showBackground ? 'bg-zinc-900 bg-opacity-95' : 'bg-zinc-900 bg-opacity-50'}`}>
                <img src="/images/logo.png" className="h-4 lg:h-7" alt="Logo" />
                <div className="flex-row ml-8 gap-7 hidden lg:flex">
                    <NavbarItem handleNavigation={() => handleNavigation('/')} label="Home"  active={router.pathname === '/'} />
                    <NavbarItem handleNavigation={() => handleNavigation('/films')} label="Films"  active={router.pathname === '/films'} />
                    <NavbarItem handleNavigation={() => handleNavigation('/myList')} label="My List" active={router.pathname === '/myList'} />
                </div>
                <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                    <p className="text-white text-sm">Browse</p>
                    <ChevronDownIcon className={`w-4 text-white fill-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
                </div>
                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <MagnifyingGlassIcon className="w-6" />
                    </div>
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BellIcon className="w-6" />
                    </div>
                    <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                            <img src="/images/default-blue.png" alt="" />
                        </div>
                        <ChevronDownIcon className={`w-4 text-white fill-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
                        <AccountMenu visible={showAccountMenu} />
                    </div>
                </div>
            </div>
        </nav>
    )
}