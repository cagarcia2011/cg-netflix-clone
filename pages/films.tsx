import { useMovieList } from "@/hooks"
import Head from "next/head"
import { useCallback, useEffect, useState } from "react";

import { MovieInterface } from "@/types";
import { MovieList } from "@/components";
import { AiOutlineLoading } from "react-icons/ai";

const Films = () => {
    const { data: movies = [], error, isLoading } = useMovieList();
    const [genreList, setGenreList] = useState<Array<string>>([])
    const [allGenreList, setAllGenreList] = useState<Array<string>>([])
    const [isAllGenre, setIsAllGenre] = useState(true)

    const filterGenre = useCallback((genre: string) => {
        if (!allGenreList.includes(genre)) return;
        setIsAllGenre(false)
        setGenreList(() => {
            return movies
                .filter((movie: MovieInterface) => movie.genre === genre)
                .map((movie: MovieInterface) => movie.genre)
        })
    }, [movies, allGenreList])

    const allGenre = useCallback(() => {
        setIsAllGenre(true)
        setGenreList(() => {
            return movies.map((movie: MovieInterface) => movie.genre)
        })
    }, [movies])

    useEffect(() => {
        if (!isLoading) {
            setGenreList(() => {

                return movies.map((movie: MovieInterface) => movie.genre)
            })
            setAllGenreList(() => {

                return movies.map((movie: MovieInterface) => movie.genre).sort((a: string, b: string) => a.localeCompare(b))
            })
        }

    }, [isLoading, movies])

    return (
        <>
            <Head>
                <title>CGFlix Clone Films</title>
            </Head>
            {
                isLoading
                    ? <div className='w-full h-[100svh] flex items-center justify-center relative z-50'>
                        <AiOutlineLoading size={60} color='#FFF' className='animate-spin' />
                    </div>
                    :
                    <>
                        <div className="w-full absolute top-[5rem] flex flex-row justify-center items-center gap-4">
                            <button onClick={() => allGenre()} className={`ring-0 ${isAllGenre ? "text-white underline" : "text-zinc-400 hover:text-white active:text-white"} text-sm md:text-lg `}>
                                All
                            </button>
                            {
                                allGenreList.map((genre: string, idx: number) => (
                                    <button key={`${genre}-${idx}`} onClick={() => filterGenre(genre)} className={`ring-0 ${genreList.includes(genre) && genreList.length === 1 ? "text-white underline" : "text-zinc-400 hover:text-white active:text-white"} text-sm md:text-lg `}>
                                        {genre}
                                    </button>
                                ))
                            }
                        </div>
                        <div className="pb-10 w-full absolute top-[8rem]">
                            {
                                genreList.length > 1
                                    ?
                                    genreList.map((genre: string, idx: number) => (
                                        <MovieList isSlider key={`${genre}-${idx}`} title={genre} data={movies.filter((movie: MovieInterface) => movie.genre === genre)} />
                                    ))
                                    : genreList.length !== 0 &&
                                    <MovieList isSlider={false} title={genreList[0]} data={movies.filter((movie: MovieInterface) => movie.genre === genreList[0])} />
                            }
                        </div>
                    </>
            }
        </>
    )
}

export default Films