import { ReactNode } from 'react'
import { Navbar } from './Navbar'
import { useRouter } from 'next/router'

interface HomeLayoutProps {
    children: ReactNode
}

export const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
    const router = useRouter()
  return (
    <>
        {
            router.pathname !== "/auth" && router.pathname !== "/profiles" &&
            <Navbar />
        }
      <main>{children}</main>
    </>
  )
}