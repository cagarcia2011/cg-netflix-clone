import { ReactNode, useEffect, useRef, useState } from 'react'
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface MovieSliderProps {
    children: ReactNode;
    numberOfMovies: number;
}

type Direction = "right" | "left"

interface ArrowProps {
    direction: Direction
}

const Arrow: React.FC<ArrowProps> = ({ direction }) => {

    return (
        <div className={'text-lg '}>
            {
                direction === "right"
                    ? <BsChevronRight size={30} color='#fff' />
                    : <BsChevronLeft size={30} color='#fff' />
            }
        </div>
    )
}

export const MovieSlider: React.FC<MovieSliderProps> = ({ children, numberOfMovies }) => {

    const [width, setWidth] = useState(window.innerWidth)

    const slider = useRef<Slider>(null)

    const [settings, setSettings] = useState({
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: numberOfMovies,
        slidesToScroll: 1,
        swipeToSlide: true,
        fade: false,
        nextArrow: <></>,
        prevArrow: <></>
    })

    const isMovieOverflow = () => {
        if (width >= 1025 && numberOfMovies <= 5) return false
        if (width >= 768 && numberOfMovies <= 3) return false
        if (numberOfMovies <= 2) return false

        return true
    }

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        setSettings(prev => ({
            ...prev,
            slidesToShow: width >= 1025 ? numberOfMovies <= 5 ? numberOfMovies : 5 : width >= 768 ? numberOfMovies <= 3 ? numberOfMovies : 3 : numberOfMovies <= 2 ? numberOfMovies : 2
        }))
    }, [width, numberOfMovies])

    return (
        <div className='relative w-full overflow-visible z-0'>
            {
                isMovieOverflow() &&
                <>
                    <button onClick={() => slider?.current?.slickPrev()} className='group border-none bg-zinc-600 bg-opacity-70 rounded-md h-[6rem] w-[1.2rem] lg:w-auto ring-0 absolute top-[5.5rem] md:top-[8rem] md:-left-8 -left-3 z-50 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-105 active:opacity-30 transition-all duration-200 ease-in-out'>
                        <Arrow direction='left' />
                    </button>
                    <button onClick={() => slider?.current?.slickNext()} className='group border-none bg-zinc-600 bg-opacity-70 rounded-md h-[6rem] w-[1.2rem] lg:w-auto ring-0 absolute top-[5.5rem] md:top-[8rem] md:-right-8 -right-3 z-50 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-105 active:opacity-30 transition-all duration-200 ease-in-out'>
                        <Arrow direction='right' />
                    </button>
                </>
            }
            <Slider ref={slider} {...settings} className='movie-slider'>
                {children}
            </Slider>
        </div>
    )
}