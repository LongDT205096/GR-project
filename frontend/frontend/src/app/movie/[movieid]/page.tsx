import React from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

import requests from "@/utils/requests";
import CastCarousel from "@/components/Cast";
import EmblaCarousel from "@/components/EmblaCarousel";
// import OtherImageGallery from "@/components/OtherImageGallery";
import WatchlistIcon from "@/components/WatchlistIcon";
import Trailer from "@/components/Trailer";
import Review from "@/components/Review";
import Rate from "@/components/Rate";

axios.defaults.baseURL = "http://127.0.0.1:8000/";
const bannerpath = "https://image.tmdb.org/t/p/original/";
const posterpath = "https://image.tmdb.org/t/p/w500";

async function getMovieResponse(movieid: string) {
    const api = requests.fetchMovieDetails + movieid + "/";
    const MovieApiresponse = await axios.get(api)
        .then((response) => {
            return response.data;
        })
    return MovieApiresponse;
}

async function getMovieImages(movieid: string) {
    const api = requests.fetchMovieDetails + movieid + "/images/";
    const OtherGalleryImages = axios.get(api)
        .then((response) => {
            return response.data;
        })
    return OtherGalleryImages;
}

async function getMovieCast(movieid: string) {
    const api = requests.fetchMovieDetails + movieid + "/actors/";
    const MovieCastresponse = axios.get(api)
        .then((response) => {
            return response.data;
        })
    return MovieCastresponse;
}

async function getMovieReview(movieid: String) {
    const api = requests.fetchMovieDetails + movieid + "/reviews/";
    const movieReview = await axios.get(api)
        .then((response) => {
            return response.data;
        })
    return movieReview;
}


// async function getRecommendations(params: { movieid: string; }) {
//     const Recommendations = await fetch(
//         `${requests.fetchMovieDetails}${params.movieid}/recommendations?api_key=e4d2477534d5a54cb6f0847a0ee853eb`,
//         {
//             cache: "no-store",
//         }
//     );

//     if (!Recommendations.ok) {
//         return new Error("data not fetching!");
//     }

//     return Recommendations.json();
// }

// async function getSimilar(params: { movieid: string; }) {
//     const similarMovies = await fetch(
//         `${requests.fetchMovieDetails}${params.movieid}/similar?api_key=e4d2477534d5a54cb6f0847a0ee853eb`,
//         {
//             cache: "no-store",
//         }
//     );

//     if (!similarMovies.ok) {
//         return new Error("data not fetching!");
//     }

//     return similarMovies.json();
// }



const Movie = async ({ params }: { params: any }) => {
    const movieDataAll = await getMovieResponse(params.movieid);
    const movieCast = await getMovieCast(params.movieid);
    const movieImages = await getMovieImages(params.movieid);
    const movieReview = await getMovieReview(params.movieid);
    // // const recommendationsCall = await getRecommendations(params);
    // const recommendations = recommendationsCall.results;
    // // const similarmoviesCall = await getSimilar(params);
    // const similarmovie = similarmoviesCall.results;

    function numberWithCommas(x: number) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className="overflow-visible">
            <div className="bg-cover relative bg-fixed bg-center md:min-h-screen h-full w-full flex md:flex-row flex-col" style={movieImages && movieImages.backdrops && movieImages.backdrops[0] ? {
                backgroundImage: `linear-gradient(to bottom, transparent, black),url(${bannerpath + movieImages.backdrops[0].image})`,
            } : {}}>
                <div className="imgContainer flex items-center p-3 justify-center flex-initial md:w-1/3 w-full">
                    <Image
                        src={movieImages.logos &&
                            movieImages.logos[0] &&
                            movieImages.logos[0].image ? posterpath + movieImages.posters[0].image : ""}
                        alt={movieDataAll.title}
                        width={250}
                        height={250}
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0dgn9DwADSwHNRhjk3gAAAABJRU5ErkJggg=="
                        priority
                        unoptimized />
                </div>
                <div className="movieDetails p-3 flex items-center md:justify-start justify-center flex-initial overflow-x-hidden md:w-2/3 w-full">
                    <div className="movieDetailsInner md:text-left text-center">
                        {movieImages.logos &&
                            movieImages.logos[0] &&
                            movieImages.logos[0].image && (
                                <Image
                                    src={`${posterpath}${movieImages.logos[0].image}`}
                                    alt={movieDataAll.title}
                                    height={150}
                                    width={150}
                                    className="md:mx-0 mx-auto"
                                    unoptimized
                                />
                            )}
                        <h1 className="text-4xl font-bold md:w-3/4 w-[90%] md:mx-0 mx-auto my-4">
                            {movieDataAll.title}
                        </h1>
                        <p className="italic text-slate-300">
                            {movieDataAll.tagline ? movieDataAll.tagline : ""}
                        </p>
                        <ul className="flex gap-5 text-slate-300 md:justify-start justify-center md:w-full w-[95%] md:mx-0 mx-auto px-2 overflow-x-scroll no-scrollbar">
                            {movieDataAll.genres &&
                                movieDataAll.genres.map((genre: any, index: React.Key | null | undefined) => (
                                    <Link key={index} href={`/genre/${genre.id}/page/1`}>
                                        <li className="my-4 px-3 py-1 rounded-3xl whitespace-nowrap bg-black w-fit text-sm">
                                            {genre.name}
                                        </li>
                                    </Link>
                                ))}
                        </ul>
                        <ul className="flex gap-5 text-slate-300 sm:justify-start justify-center my-2">
                            <li>{movieDataAll.duration + " " + "Mins"}</li>
                            <li className="list-disc">{movieDataAll.release_date}</li>
                            <li className="list-disc">{movieDataAll.original_country}</li>
                        </ul>
                        <ul className="flex gap-5 text-slate-300 sm:justify-start justify-center my-4">
                            <li className="text-2xl flex items-center text-slate-300 font-bold md:justify-start justify-center">
                                <span className="material-icons pr-3">star</span>
                                {movieDataAll.ave_rate.toFixed(1) + "/ " + "5.0"}
                            </li>
                            <li>
                                <Rate movieId={movieDataAll.id} movieTitle={movieDataAll.title} />
                            </li>
                        </ul>
                        <ul className="flex gap-5 text-slate-300 sm:justify-start justify-center my-2">
                            <li className="flex items-center justify-center rounded-full bg-black p-4">
                                <WatchlistIcon favMovie={movieDataAll.id} />
                            </li>
                            <li className="flex items-center justify-center rounded-full bg-black p-4">
                                <WatchlistIcon favMovie={movieDataAll.id} />
                            </li>
                            <li>
                                <Trailer movieId={movieDataAll.id} />
                            </li>
                        </ul>
                        <div>
                            <h1 className="text-2xl">Summary</h1>
                            <p className="text-lg font-light my-2 md:w-2/3 w-[95%] md:mx-0 mx-auto">{movieDataAll.summary}</p>
                        </div>
                        <div className="mt-4 inline-block">
                            <Link className="text-2xl hover:underline cursor" href={`/cast/director/${movieDataAll.director.id}`}>{movieDataAll.director.name}</Link>
                            <p className="text-lg font-light my-2 md:w-2/3 w-[95%] md:mx-0 mx-auto">
                                Director
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-screen flex">
                <div className="w-3/4 flex flex-col items-center">
                    <div className="w-[80%]">
                        <CastCarousel Casts={movieCast.actors} movieId={params.movieid} />
                    </div>

                    <hr className="w-[80%] mx-auto my-4 border-t-2 border-gray-500" />

                    <div className="w-[80%]">
                        <Review Reviews={movieReview.reviews} movieId={params.movieid} />
                    </div>

                    {/* <div className="otherImagesGalleryContainer">
            <OtherImageGallery
            GalleryImages={
                movieImages.backdrops && movieImages.backdrops.slice(0, 6)
            }
            />
        </div>  */}
                    {/* <div className="latestReleases my-5 w-full ml-auto">
                    <div className="md:ml-16 ml-0 latestinner h-full overflow-hidden">
                        {similarmovie && similarmovie.length > 0 ? (
                            <div className="heading">
                                <h1 className="text-2xl my-3">Movies You May Like</h1>
                            </div>
                        ) : null}
                        <EmblaCarousel Categories={similarmovie} />
                    </div>
                </div>
                <div className="latestReleases my-5 w-full ml-auto">
                    <div className="md:ml-16 ml-0 latestinner h-full overflow-hidden">
                        <div className="heading">
                            {recommendations && recommendations.length > 0 ? (
                                <h1 className="text-2xl my-3">Recommended Movies</h1>
                            ) : null}
                        </div>
                        <EmblaCarousel Categories={recommendations} />
                    </div>
                </div> */}
                </div>

                <div className="w-1/4 flex flex-col">
                    <div className="w-[80%] mx-auto my-4">
                        <ul className="pt-8 flex flex-col gap-2">
                            <li className="flex-col items-center gap-2">
                                <p className="text-2xl">Status</p>
                                <p className="text-lg font-light my-2 md:w-2/3 w-[95%] md:mx-0 mx-auto">
                                    Released
                                </p>
                            </li>
                            <li className="flex-col items-center gap-2">
                                <p className="text-2xl">Budget</p>
                                <p className="text-lg font-light my-2 md:w-2/3 w-[95%] md:mx-0 mx-auto">
                                    ${numberWithCommas(movieDataAll.budget)}
                                </p>
                            </li>
                            <li className="flex-col items-center gap-2">
                                <p className="text-2xl">Revenue</p>
                                <p className="text-lg font-light my-2 md:w-2/3 w-[95%] md:mx-0 mx-auto">
                                    ${numberWithCommas(movieDataAll.revenue)}
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Movie;
