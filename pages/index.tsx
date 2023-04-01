import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

import { Billboard, MovieList, InfoModal } from '@/components';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import Head from 'next/head';
import { AiOutlineLoading } from 'react-icons/ai';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

const Home = () => {
  const { data: movies = [], error: moviesError, isLoading: moviesIsLoading } = useMovieList();
  const { data: favorites = [], error: favoriteError, isLoading: favoriteIsLoading } = useFavorites();
  const { isOpen, closeModal } = useInfoModalStore();

  return (
    <>
      <Head>
        <title>CGFlix Clone</title>
      </Head>
      {
        moviesIsLoading
          ? <div className='absolute flex items-center justify-center w-full h-[100svh] bg-black top-0 left-0 bg-opacity-60 z-50'>
            <AiOutlineLoading size={60} color='#FFF' className='animate-spin' />
          </div>
          : <>
            <InfoModal visible={isOpen} onClose={closeModal} />
            <Billboard />
            <div className="pb-40  w-full relative ">
              <MovieList isSlider title="Trending Now" data={movies} />
              {
                favoriteIsLoading
                ? <div className='w-full h-[25vh] flex items-center justify-center relative z-50'>
                  <AiOutlineLoading size={60} color='#FFF' className='animate-spin' />
                </div>
                : <MovieList isSlider title="My List" data={favorites} />
              }
            </div>
          </>
      }
    </>
  )
}
export default Home;