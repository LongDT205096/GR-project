"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import requests from "@/utils/requests";


const bannerpath = "https://image.tmdb.org/t/p/original";
const posterpath = "https://image.tmdb.org/t/p/w500";
const logopath = "https://image.tmdb.org/t/p/w200";

const Banner = ({ bannerContent }: { bannerContent: any[] }) => {
    const [firstbannerContent, setBannerContent] = useState(bannerContent[0]);
    const [bannerMovieDetails, setBannerMovieDetails] = useState(Object);

    const [gradientDirection, setGradientDirection] = useState("left");

    useEffect(() => {
        const getMovieDetails = async () => {
            try {
                if (firstbannerContent.media_type == 'movie') {
                    var movieDetails = await fetch(
                        `${requests.fetchMovieDetails}${firstbannerContent.id}?api_key=e4d2477534d5a54cb6f0847a0ee853eb&append_to_response=images`,
                        {
                            cache: "no-store",
                        }
                    );

                } else {
                    var movieDetails = await fetch(
                        `${requests.fetchSeriesDetails}${firstbannerContent.id}?api_key=e4d2477534d5a54cb6f0847a0ee853eb&append_to_response=images`,
                        {
                            cache: "no-store",
                        }
                    );

                }
                if (!movieDetails.ok) {
                    console.log("movie data not found");
                }
                const moviedetailsjson = await movieDetails.json();

                setBannerMovieDetails(moviedetailsjson);
            } catch (error) {
                console.error("Error fetching movie data:", error);
            }
        };

        getMovieDetails();
    }, [firstbannerContent]);
    useEffect(() => {
        if (typeof window !== "undefined") {
            // Check window.innerWidth to determine the gradient direction
            if (window.innerWidth < 640) {
                setGradientDirection("bottom");
            } else {
                setGradientDirection("left");
            }
        }


    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "60px",
        focusOnSelect: true,
        autoplay: true,
        autoplaySpeed: 10000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: "40px",
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: "40px",
                    slidesToShow: 1,
                },
            },
        ],
    };

    const handleBannerContent = (index: number) => {
        setBannerContent(bannerContent[index]);
    };
    var release_year = "";
    if (
        bannerMovieDetails &&
        (bannerMovieDetails.release_date)
    ) {
        const dateStr = bannerMovieDetails.release_date;
        const release_date = new Date(dateStr);

        if(dateStr !== ''){
            release_year = String(release_date.getFullYear());
        } else {
            // Handle the case where the date is invalid or not provided
            console.error("Invalid date:", dateStr);
        }
    }

    return (
        <div className="relative text-lg">
            <div
                key={bannerMovieDetails.id}
                style={{
                    backgroundImage: `linear-gradient(to  ${gradientDirection}, transparent, black), url(${bannerpath + firstbannerContent.backdrop_path
                        })`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}
                className={`bannerContainer sm:h-[100vh] h-full  sm:aspect-auto  aspect-square w-full relative overflow-x-hidden`}
            >
                <div className="bannerTextContainer md:w-1/2 w-[75%] absolute md:top-1/5 top-1/5 bottom-2/4 left-[10%]">
                    {bannerMovieDetails.images &&
                        bannerMovieDetails.images.logos &&
                        bannerMovieDetails.images.logos[0] &&
                        bannerMovieDetails.images.logos[0].file_path ? (
                        <Image
                            src={`${logopath}${bannerMovieDetails.images.logos[1].file_path}`}
                            height={150}
                            width={150}
                            alt="slider_img"
                            className="md:mx-0 mx-auto"
                            unoptimized
                        />
                    ) : (
                        <h1
                            className={`font-bold md:text-left text-center ${firstbannerContent &&
                                firstbannerContent.title &&
                                firstbannerContent.title.length > 25
                                ? "text-2xl"
                                : "text-4xl"
                                }`}
                        >
                            {firstbannerContent.title
                                ? firstbannerContent.title
                                : firstbannerContent.name}
                        </h1>
                    )}
                    {release_year && (
                        <ul className="smallContent md:justify-start justify-center flex gap-7 list-none my-3">
                            <li>{release_year}</li>
                            <li className="list-disc">
                                {bannerMovieDetails.original_language}
                            </li>
                            <li className="list-disc">
                                <span className="flex items-center flex-row ">
                                    <span className="material-icons mr-2 text-sm">star</span>
                                    {firstbannerContent.vote_average.toFixed(1) + "/ " + "10"}
                                </span>
                            </li>
                        </ul>
                    )}
                    <p className="line-clamp-5 text-base md:text-lg hidden sm:block ">
                        {bannerMovieDetails.overview}
                    </p>
                    <Link
                        href={`/${firstbannerContent.media_type == 'movie' ? 'movies' : 'ott/details'}/${bannerMovieDetails.id}`}
                        style={{ cursor: "pointer !important" }}
                    >
                        <button className="py-2 px-5 bg-neutral-800 my-3 rounded-md font-bold mx-auto md:mx-0 block text-sm  hover:bg-neutral-800/50 cursor-pointer text-white">
                            Know More
                        </button>
                    </Link>
                </div>
            </div>
            {/* <div className="bannerOverlay absolute top-0 left-0 w-full h-full bg-black z-0"></div> */}
            <div className="posterContainer bannerSliderContainer absolute bottom-4 w-full flex-row sm:flex hidden justify-end">
                <div className="w-2/4 overflow-x-hidden mx-5 gap-5">
                    <Slider
                        {...settings}
                        afterChange={(index) => handleBannerContent(index)}
                    >
                        {bannerContent.map((banner, index) => (
                            <Image
                                src={posterpath + banner.poster_path}
                                key={index}
                                alt={`${banner.original_title}`}
                                width={100}
                                height={100}
                                onClick={() => handleBannerContent(index)}
                                className="cursor-pointer sm:visible invisible slide"
                                unoptimized
                            />
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default Banner;
