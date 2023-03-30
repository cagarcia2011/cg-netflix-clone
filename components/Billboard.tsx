import React, { useCallback, useEffect, useRef, useState } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { BiVolumeFull, BiVolumeMute } from 'react-icons/bi'

import { PlayButton } from '.';
import { useBillboard, useInfoModalStore } from '@/hooks'

const TOP_OFFSET = 66

export const Billboard: React.FC = () => {
    const { openModal } = useInfoModalStore();
    const { data } = useBillboard();
    const [muted, setMuted] = useState(true)
    const videoPreviewRef = useRef<HTMLVideoElement>(null)

    const handleOpenModal = useCallback(() => {
        openModal(data?.id);
    }, [openModal, data?.id]);

    const [truncatedDesc, setTruncatedDesc] = useState(() => {
        const firstPeriod = data?.description?.indexOf('.')

        return data?.description ? data.description.substring(0, firstPeriod + 1) + '..' : ''
    })

    useEffect(() => {
        const videoPreview = videoPreviewRef.current
        videoPreview ? videoPreview.currentTime = 90 : null
        const checkVideoPreview = () => {
            if (videoPreview?.currentTime && videoPreview.currentTime > 146) {
                videoPreview.currentTime = 90
                videoPreview.play()
            } else if (videoPreview?.currentTime && videoPreview.currentTime === 90 && videoPreview.paused) {
                videoPreview.play()
            }
        }
        videoPreview?.addEventListener('timeupdate', checkVideoPreview)

        return () => {
            videoPreview?.removeEventListener('timeupdate', checkVideoPreview)
        }
    }, [])

    useEffect(() => {
        const videoPreview = videoPreviewRef.current

        videoPreview ? videoPreview.muted = muted : null
    }, [muted])

    useEffect(() => {
        setTruncatedDesc(() => {
            const firstPeriod = data?.description?.indexOf('.')

            return data?.description ? data.description.substring(0, firstPeriod + 1) + '..' : ''
        })
    }, [data?.description])

    return (
        <div className="relative h-[56.25svh]">
            <video ref={videoPreviewRef} id="video-preview" src={data?.videoUrl} poster={data?.thumbnailUrl} className="w-full h-[56.25svh] object-cover brightness-[50%] transition duration-500" muted autoPlay loop>
            </video>
            <div className="absolute top-[50%] md:top-[40%] ml-4 md:ml-16">
                <p className="text-white text-2xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
                    {data?.title}
                </p>
                <p className="text-white text-xs md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
                    {truncatedDesc}
                </p>
                <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
                    <PlayButton movieId={data?.id} />
                    <button
                        onClick={handleOpenModal}
                        className="
                        bg-white
                        text-white
                        bg-opacity-30 
                        rounded-md 
                        py-2 md:py-2 
                        px-2 md:px-4
                        w-auto 
                        text-sm lg:text-lg 
                        font-semibold
                        flex
                        flex-row
                        items-center
                        hover:bg-opacity-20
                        transition
                        "
                    >
                        <InformationCircleIcon className="w-4 md:w-7 mr-1" />
                        More Info
                    </button>
                </div>
            </div>
            <div className='absolute top-[80%] md:top-[90%] ml-4 md:ml-16 right-[5%]'>
                <button onClick={() => setMuted(prev => !prev)} className='
                    opacity-60
                    hover:opacity-75 hover:scale-105
                    transition

                '>
                    {
                        muted
                            ? <BiVolumeMute size={30} color='white' />
                            : <BiVolumeFull size={30} color='white' />
                    }
                </button>
            </div>
        </div>
    )
}