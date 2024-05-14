import React from "react";
import Image from "next/image";
import requests from "@/utils/requests";
import CastCarousel from "@/components/Cast";
import SwipableSlider from "@/components/SwipableSlider";
// import OtherImageGallery from "@/components/OtherImageGallery";
// import FavoriteIcon from "@/components/FavoriteIcon";
// import Trailer from "@/components/Trailer";
// import Review from "@/components/Review";
import Link from "next/link";

const bannerpath = "https://image.tmdb.org/t/p/original/";
const posterpath = "https://image.tmdb.org/t/p/w500";
async function getMovieResponse(params: { movieid: any; }) {
    const MovieApiresponse = await fetch(
        `${requests.fetchMovieDetails}${params.movieid}?api_key=e4d2477534d5a54cb6f0847a0ee853eb&append_to_response=images`,
        {
            cache: "no-store",
        }
    );

    if (!MovieApiresponse.ok) {
        return new Error("data not fetching!");
    }

    return MovieApiresponse.json();
}
async function getMovieCast(params: { movieid: any; }) {
    const MovieCastresponse = await fetch(
        `${requests.fetchMovieDetails}${params.movieid}/credits?api_key=e4d2477534d5a54cb6f0847a0ee853eb`,
        {
            cache: "no-store",
        }
    );

    if (!MovieCastresponse.ok) {
        return new Error("data not fetching!");
    }

    return MovieCastresponse.json();
}

async function getMovieImages(params: { movieid: any; }) {
    const OtherGalleryImages = await fetch(
        `${requests.fetchMovieDetails}${params.movieid}/images?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
        {
            cache: "no-store",
        }
    );

    if (!OtherGalleryImages.ok) {
        return new Error("data not fetching!");
    }

    return OtherGalleryImages.json();
}
async function getRecommendations(params: { movieid: any; }) {
    const Recommendations = await fetch(
        `${requests.fetchMovieDetails}${params.movieid}/recommendations?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
        {
            cache: "no-store",
        }
    );

    if (!Recommendations.ok) {
        return new Error("data not fetching!");
    }

    return Recommendations.json();
}
async function getSimilar(params: { movieid: any; }) {
    const similarMovies = await fetch(
        `${requests.fetchMovieDetails}${params.movieid}/similar?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
        {
            cache: "no-store",
        }
    );

    if (!similarMovies.ok) {
        return new Error("data not fetching!");
    }

    return similarMovies.json();
}

const Movie = async ({ params }: { params: { movieid: any } }) => {
    const movieDataAll = await getMovieResponse(params);
    const MovieCast = await getMovieCast(params);
    const release_date = new Date(movieDataAll.release_date);
    const release_year = release_date.getFullYear();
    const other_images = await getMovieImages(params);
    const recommendationsCall = await getRecommendations(params);
    const recommendations = recommendationsCall.results;
    const similarmoviesCall = await getSimilar(params);
    const similarmovie = similarmoviesCall.results;

    return (
        <div className="overflow-x-hidden">
            <div
                className="bg-cover relative bg-fixed bg-center md:min-h-screen h-full w-full flex md:flex-row flex-col"
                style={{
                    backgroundImage: `linear-gradient(to bottom, transparent, black),url(${bannerpath + movieDataAll.backdrop_path
                        })`,
                }}
            >
                <div className="imgContainer flex items-center p-3 justify-center flex-initial md:w-1/3 w-full">
                    <Image
                        src={posterpath + movieDataAll.poster_path}
                        alt={movieDataAll.original_title}
                        width={250}
                        height={250}
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0dgn9DwADSwHNRhjk3gAAAABJRU5ErkJggg=="
                        priority
                        unoptimized
                    />
                </div>
                <div className="movieDetails p-3 flex items-center md:justify-start justify-center flex-initial overflow-x-hidden md:w-2/3 w-full">
                    <div className="movieDetailsInner md:text-left text-center">
                        {movieDataAll.images &&
                            movieDataAll.images.logos &&
                            movieDataAll.images.logos[1] &&
                            movieDataAll.images.logos[1].file_path && (
                                <Image
                                    src={`${posterpath}${movieDataAll.images.logos[1].file_path}`}
                                    alt={movieDataAll.original_title}
                                    height={150}
                                    width={150}
                                    className="md:mx-0 mx-auto"
                                    unoptimized
                                />
                            )}
                        <h1 className="text-4xl font-bold md:w-3/4 w-[90%] md:mx-0 mx-auto">
                            {movieDataAll.original_title}
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
                        <ul className="flex gap-5 text-slate-300 sm:justify-start justify-center">
                            <li>{movieDataAll.runtime + " " + "Mins"}</li>
                            <li className="list-disc">{release_year}</li>
                            <li className="list-disc">{movieDataAll.original_language}</li>
                        </ul>
                        <ul className="flex gap-5 text-slate-300 sm:justify-start justify-center">
                            <li className="flex items-center text-slate-300 font-bold md:justify-start justify-center">
                                <span className="material-icons p-3">star</span>
                                {movieDataAll.vote_average &&
                                    movieDataAll.vote_average.toFixed(1) + "/ " + "10"}
                            </li>
                            <li className="flex items-center justify-center rounded-full bg-black p-4">
                                {/* <FavoriteIcon favMovie={movieDataAll.id} /> */}
                            </li>
                        </ul>
                        <p className="font-light my-2 md:w-2/3 w-[95%] px-4 md:mx-0 mx-auto">{movieDataAll.overview}</p>
                        {/* <Trailer movieId={movieDataAll.id} /> */}
                    </div>
                </div>
            </div>

            <div className="castSection">
                <CastCarousel Cast={MovieCast.cast} />
            </div>

            {/* <div className="review_section">
        <Review movieid={movieDataAll.id} />
      </div>

      <div className="otherImagesGalleryContainer">
        <OtherImageGallery
          GalleryImages={
            other_images.backdrops && other_images.backdrops.slice(0, 6)
          }
        />
      </div> */}
            <div className="latestReleases my-5 w-full ml-auto">
                <div className="md:ml-16 ml-0 latestinner h-full overflow-hidden">
                    {similarmovie && similarmovie.length > 0 ? (
                        <div className="heading">
                            <h1 className="text-2xl my-3">Movies You May Like</h1>
                        </div>
                    ) : null}
                    <SwipableSlider Categories={similarmovie} />
                </div>
            </div>
            <div className="latestReleases my-5 w-full ml-auto">
                <div className="md:ml-16 ml-0 latestinner h-full overflow-hidden">
                    <div className="heading">
                        {recommendations && recommendations.length > 0 ? (
                            <h1 className="text-2xl my-3">Recommended Movies</h1>
                        ) : null}
                    </div>
                    <SwipableSlider Categories={recommendations} />
                </div>
            </div>
        </div>
    );
};

export default Movie;
