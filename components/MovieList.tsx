import React from 'react';

import { MovieInterface } from '@/types';
import { MovieCard, MovieSlider } from '.';
import { isEmpty } from 'lodash';

interface MovieListProps {
    data: MovieInterface[];
    title: string;
    isSlider: boolean;
}

export const MovieList: React.FC<MovieListProps> = ({ data, title, isSlider }) => {
    if (isEmpty(data)) {
        return null;
    }

    return (
        <div className="px-4 md:px-12 mt-4 space-y-8 w-full relative flex items-center justify-center">
            <div className='w-full relative overflow-visible movie-slider-container'>
                <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4 z-0">{title}</p>
                {
                    isSlider
                    ?
                        <MovieSlider numberOfMovies={data.length} >
                            {
                                data.map((movie) => (
                                    <MovieCard key={movie.id} data={movie} />
                                ))
                            }
                        </MovieSlider>
                    :
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                        {data.map((movie) => (
                            <MovieCard key={movie.id} data={movie} />
                        ))}
                    </div>
                }
            </div>
        </div>
    );
}