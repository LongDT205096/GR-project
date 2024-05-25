"use client"
import React, { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay'


const ReviewSlider = (reviewResults: { reviewResults: any; }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'center', dragFree: true });
    const [isLoaded, setIsLoaded] = useState(true);
    const [fullReview, setFullReview] = useState(null);
    const [openFullReview, setOpenFullReview] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);
    const handleFullReview = (review: { content: React.SetStateAction<null>; }) => {
        setFullReview(review.content);
        setOpenFullReview(true);
    };
    
    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            if (emblaApi) {
                emblaApi.reInit();
            }
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [emblaApi]);
    const reviewData = reviewResults.reviewResults;

    return (
        <div className="embla">
            <div className="embla__viewport overflow-hidden" ref={emblaRef}>
                <div className="embla__container flex space-x-2 transition-transform duration-300">
                    {reviewData && reviewData.map((review: any) => (
                        <div className='md:w-[250px] h-52 overflow-hidden p-3 m-2 rounded-lg bg-neutral-800 embla__slide review_slide flex-none' key={review.id}>
                            <h3 className='text-xl font-bold'>{review.author}</h3>
                            <p className='text-sm line-clamp-5 mt-3 review-content'>{review.content}</p>
                            <button onClick={() => handleFullReview(review)}>Read More</button>
                        </div>
                    ))}
                </div>
            </div>
            {openFullReview && (<div className="fixed inset-0 z-50 flex items-center justify-center">
                <div
                    className="flexi-modal-back absolute inset-0 bg-black"
                ></div>
                <div className="flexi-modal-content md:w-[70%] w-[95%] h-[70vh]  md:min-h-[70vh] relative z-10 rounded">
                    <span
                        className="flexi-modal-close-icon sm:bg-white py-2 px-3 absolute sm:-right-10 right-5 -top-10 cursor-pointer sm:text-slate-500 text-white sm:rounded-full"
                        onClick={() => setOpenFullReview(false)}
                    >
                        <span className="sm:block hidden">✘</span>
                        <span className="sm:hidden block underline text-white">
                            Close
                        </span>
                    </span>
                    <div className='overflow-y-scroll h-[75vh] w-full'>
                        <p className='text-white review-content'>{fullReview}</p>
                    </div>
                </div>
            </div>)}
        </div>

    )
}

export default ReviewSlider
