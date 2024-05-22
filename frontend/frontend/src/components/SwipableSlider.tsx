"use client";
import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";

const posterpath = "https://image.tmdb.org/t/p/w300";

const SwipableSlider = ({ Categories }: { Categories: any[] }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { align: "center", dragFree: true, containScroll: 'trimSnaps' },

    );
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        setWindowWidth(window.innerWidth);

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            if (emblaApi) {
                emblaApi.reInit();
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };

    }, [emblaApi]);

    return (
        <div className="embla">
            <div className="embla__viewport overflow-hidden" ref={emblaRef}>
                <div className="embla__container flex transition-transform duration-300">
                    {Categories &&
                        Categories.map(
                            (category, index) =>
                                category.poster_path && (
                                    <div key={index} className="embla__slide flex-none mx-1.5 w-1/8">
                                        <Link href={`/${category.number_of_episodes ? 'ott/details' : 'movies'}/${category.id}`}>
                                            <Image
                                                src={posterpath + category.poster_path}
                                                alt={`${category.original_title}`}
                                                width={200}
                                                height={200}
                                                objectFit="cover"
                                                className="cursor-pointer slide rounded-sm"
                                                placeholder="blur"
                                                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0dgn9DwADSwHNRhjk3gAAAABJRU5ErkJggg=="
                                                unoptimized
                                            />
                                        </Link>
                                    </div>
                                )
                        )}
                </div>
            </div>
        </div>
    );
};

export default SwipableSlider;
