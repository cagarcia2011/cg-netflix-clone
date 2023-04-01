import { MovieList } from "@/components"
import { useFavorites } from "@/hooks"
import Head from "next/head"
import { AiOutlineLoading } from "react-icons/ai"


const MyList = () => {
    const { data: favorites = [], error, isLoading } = useFavorites()

    return <>
        <Head>
            <title>CGFlix Clone My List</title>
        </Head>
        {
            isLoading
                ?
                <div className='w-full h-[100svh] flex items-center justify-center relative z-50'>
                    <AiOutlineLoading size={60} color='#FFF' className='animate-spin' />
                </div>
                :
                <>
                    <div className="pb-10 w-full absolute top-[5rem]">
                        <MovieList isSlider={false} title="My List" data={favorites} />
                    </div>
                </>
        }
    </>
}

export default MyList