import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { CgClose } from 'react-icons/cg'

interface MobileMenuProps {
    visible?: boolean;
    toggleVisible?: () => void
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ visible, toggleVisible }) => {
    const router = useRouter()

    const handleNavigation = useCallback((to: string) => {
        router.push(to)
    }, [router])

    return (
        <div className="relative z-50">
            <div className={`absolute bg-black w-[100vw] h-[100vh] top-0 left-0 blur ${visible ? "translate-y-0 bg-opacity-90 blur" : "-translate-y-[110vh] bg-opacity-0 blur-0"} trasnsition-all duration-300 ease-in-out`}>
            </div>
            <button onClick={() => toggleVisible && toggleVisible()} 
                className={`absolute top-16 right-9 bg-transparent border-none ring-0 active:scale-105 active:opacity-100 transition rounded-full ${visible ? "translate-y-0 opacity-80" : "-translate-y-[110vh] opacity-0"} trasnsition-all duration-300 ease-in-out`}>
                <CgClose color="white" size={30}/>
            </button>
            <div className={`bg-black absolute w-[100vw] top-20 left-0 py-5 flex-col flex bg-transparent ${visible ? "translate-y-0" : "-translate-y-[110vh]"} trasnsition-all duration-300 ease-in-out`}>
                <div className="flex flex-col gap-4">
                    <div onClick={() => {
                        router.pathname !== '/' && handleNavigation('/')
                        toggleVisible && toggleVisible()
                    }} className={`px-3 text-center text-white ${router.pathname === '/' && "underline"} active:scale-105`}>
                        Home
                    </div>
                    <div onClick={() => {
                        router.pathname !== '/films' && handleNavigation('/films')
                        toggleVisible && toggleVisible()
                    }} className={`px-3 text-center text-white  ${router.pathname === '/films' && "underline"} active:scale-105`}>
                        Films
                    </div>
                    <div onClick={() => {
                        router.pathname !== '/myList' && handleNavigation('/myList')
                        toggleVisible && toggleVisible()
                    }} className={`px-3 text-center text-white  ${router.pathname === '/myList' && "underline"} active:scale-105`}>
                        My List
                    </div>
                </div>
            </div>
        </div>
    )
}