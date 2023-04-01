/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { PlayIcon } from '@heroicons/react/24/solid';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

import { MovieInterface } from '@/types';
import { FavoriteButton } from '.';
import { useInfoModalStore } from '@/hooks';

interface MovieCardProps {
    data: MovieInterface;
}

export const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
    const router = useRouter();
    const { openModal } = useInfoModalStore();
    const [moreInfoOpen, setMoreInfoOpen] = useState(false)

    const redirectToWatch = useCallback(() => router.push(`/watch/${data.id}`), [router, data.id]);

    return (
        <div className="group bg-zinc-900 col-span relative h-[30vh] md:h-[35vh] mx-2 max-w-[10.5rem] md:max-w-[16rem] lg:max-w-[27rem] overflow-visible" onMouseOver={() => setMoreInfoOpen(true)} onMouseOut={() => setMoreInfoOpen(false)}>
            <img src={data.thumbnailUrl} alt="Movie" draggable={false} className="
                cursor-pointer
                object-cover
                transition
                duration
                shadow-xl
                rounded-md
                group-hover:opacity-10
                delay-300
                w-full
                h-[30vh] md:h-[35vh]
                z-0
            " />
            <div className="
                opacity-0
                absolute
                top-0
                transition
                duration-200
                visible
                delay-300
                w-full
                scale-0
                group-hover:scale-110
                group-hover:-translate-y-[6vh]
                group-hover:translate-x-[2vw]
                group-hover:opacity-100
                groud-hover:visible
                z-20
            ">
                <img onClick={moreInfoOpen ? redirectToWatch : () => setMoreInfoOpen(true)} src={data.thumbnailUrl} alt="Movie" draggable={false} className="
                cursor-pointer
                object-cover
                transition
                duration
                shadow-xl
                rounded-t-md
                w-full
                h-[12vh]
                z-[1000]
                " />
                <div className="
                bg-zinc-800
                p-2
                lg:p-4
                absolute
                w-full
                transition
                shadow-md
                rounded-b-md
                z-[1000]
                ">
                    <div className="flex flex-row items-center gap-3 z-[1000]">
                        <div onClick={moreInfoOpen ? redirectToWatch : () => setMoreInfoOpen(true)} className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300">
                            <PlayIcon className="text-black w-4 lg:w-6" />
                        </div>
                        <FavoriteButton movieId={data.id} />
                        <div onClick={() => openModal(data?.id)} className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
                            <ChevronDownIcon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
                        </div>
                    </div>
                    <p className="text-green-400 font-semibold mt-4">
                        New <span className="text-white">2023</span>
                    </p>
                    <div className='flex items-center mt-4'>
                        <p className='text-white text-lg font-bold'>{data?.title}</p>
                    </div>
                    <div className="flex flex-row gap-2 mt-1 items-center">
                        <p className="text-white text-[8px] lg:text-sm">{data.duration}</p>
                    </div>
                    <div className="flex flex-row items-center gap-2 mt-4 text-[8px] text-white lg:text-sm">
                        <p>{data.genre}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}