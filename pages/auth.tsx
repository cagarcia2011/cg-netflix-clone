import { Nav, Input } from "@/components";
import axios from "axios";
import { NextPageContext } from "next";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context)

    if (session) {
        return {
            props: {
                redirects: {
                    destination: '/',
                    permanent: false
                }
            }
        }
    }

    return {
        props: {}
    }
}

const Auth = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const [isLogin, setIsLogin] = useState(true)
    const [isRegister, setIsRegister] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const toggleAuthType = useCallback(() => {
        setIsLogin(prev => !prev)
        setError('')
    }, [])

    const onNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
        setError('')
    }, [])
    const onEmailChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
        setError('')
    }, [])
    const onPasswordChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
        setError('')
    }, [])

    const handleDemoAccount = (event: React.MouseEvent<HTMLSpanElement>) => {
        setEmail("demo.account@test.com")
        setPassword("demoaccount1234")
    }

    const login = useCallback(async (event: React.MouseEvent<HTMLButtonElement> | null = null) => {
        setIsLoading(true)
        event?.preventDefault()
        try {
            const response = await signIn('credentials', {
                email,
                password,
                redirect: false,
                callbackUrl: '/'
            })

            if (response?.error) {
                setIsLoading(false)
                setError(response.error)
                return;
            }

            router.push('/profiles')
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.info('Error on login')
            console.error(error)
        }
    }, [email, password, router])

    const register = useCallback(async (event: React.MouseEvent<HTMLButtonElement> | null = null) => {
        setIsLoading(true)
        event?.preventDefault()
        try {
            await axios.post('/api/register', {
                email,
                name,
                password
            })

            login();
        } catch (error) {
            setIsLoading(false)
            console.info("Error on register")
            console.error(error)
        }
    }, [email, name, password, login])

    useEffect(() => {
        setIsRegister(!isLogin)
    }, [isLogin])

    return (
        <div className="relative h-[100svh] w-full bg-hero bg-image">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <Nav />
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-[1.2rem] lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {isLogin ? "Sign In" : "Register"}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {isRegister && <Input id="name" type="text" label="Name" value={name} onChange={onNameChange} />}
                            <Input id="email" type="email" label="Email" value={email} onChange={onEmailChange} />
                            <Input id="password" type="password" label="Password" value={password} onChange={onPasswordChange} />
                        </div>
                        {
                            isLogin &&
                            <p className="text-neutral-500 mt-1">
                                Need a demo account?
                                <span onClick={handleDemoAccount} className="text-white ml-1 hover:underline cursor-pointer">
                                    Click Here
                                </span>
                            </p>
                        }
                        <button onClick={isLogin ? login : register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition-all duration-150 ease-in-out">
                            {
                                isLogin && !isLoading ? "Sign In" : !isLoading ? "Register" :
                                    <div className="flex items-center justify-center">
                                        <AiOutlineLoading3Quarters color="#fff" className="animate-spin" fontSize={"1.5rem"} />
                                    </div>
                            }
                        </button>
                        {error && <p className="text-red-600 mt-6">{error}</p>}
                        <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                            <div onClick={() => signIn('google', { callbackUrl: '/profiles' })} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                                <FcGoogle size={32} />
                            </div>
                            <div onClick={() => signIn('github', { callbackUrl: '/profiles' })} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                                <FaGithub size={32} />
                            </div>
                        </div>
                        <p className="text-neutral-500 mt-12">
                            {isLogin ? "First time using Netflix?" : 'Already have an account?'}
                            <span onClick={toggleAuthType} className="text-white ml-1 hover:underline cursor-pointer">
                                {isLogin ? "Create an account" : "Sign in"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth