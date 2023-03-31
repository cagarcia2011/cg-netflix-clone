/* eslint-disable @next/next/no-img-element */
import { NextPage, NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useCurrentUser } from "@/hooks";
import Head from "next/head";

interface UserCardProps {
    name: string;
    imgSrc: string;
}

interface AppProps {
    imgSrc: string
}

const UserCard: React.FC<UserCardProps> = ({ name, imgSrc }) => {


    return (
        <div className="group flex-row w-44 mx-auto">
            <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                <img draggable={false} className="w-max h-max object-contain" src={imgSrc} alt="" />
            </div>
            <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">{name}</div>
        </div>
    );
}

const App: NextPage<AppProps> = ({ imgSrc }) => {
    const router = useRouter();
    const { data: currentUser } = useCurrentUser();

    const selectProfile = useCallback(() => {
        router.push('/');
    }, [router]);

    return (
        <>
            <Head>
                <title>CGFlix Clone Profiles</title>
            </Head>
            <div className="flex items-center h-full justify-center">
                <div className="flex flex-col">
                    <h1 className="text-3xl md:text-6xl text-white text-center">Who&#39;s watching?</h1>
                    <div className="flex items-center justify-center gap-8 mt-10">
                        <div onClick={() => selectProfile()}>
                            <UserCard name={currentUser?.name} imgSrc={imgSrc} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);

    const images = [
        '/images/default-blue.png',
        '/images/default-red.png',
        '/images/default-slate.png',
        '/images/default-green.png'
    ]

    const imgSrc = images[Math.floor(Math.random() * images.length)]

    if (!session) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false,
            },
        }
    }

    return {
        props: {
            imgSrc
        }
    }
}

export default App;