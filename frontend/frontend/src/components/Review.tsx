import axios from "axios";
import Link from "next/link";
import requests from "@/utils/requests";
import ReviewSlider from "./ReviewSlider";

axios.defaults.baseURL = "https://127.0.0.1:8000/";

async function getMovieReview(movieid: String) {
    const api = requests.fetchMovieDetails + movieid + "/reviews/";
    const movieReview = await axios.get(api)
        .then((response) => {
            return response.data;
        })
    console.log(movieReview.length)
    return movieReview;
}

const Review = ({ Reviews, movieId }: { Reviews: any[], movieId: number }) => {
    const reviewCall = Reviews;

    return (
        <section className="mx-auto my-8">
            <div className="flex heading justify-between">
                <div className="flex items-center space-x-2 mb-4">
                    <div className="w-1 rounded-sm h-full bg-white"></div>
                    <h1 className="text-3xl my-1">Review</h1>
                </div>

                <button className="flex space-x-2 text-2xl items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-white">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                    <Link href={`${movieId}/reviews`} className="inline-block align-middle hover:underline">All review</Link>
                </button>
            </div>
            { reviewCall && reviewCall.length > 0 ? (
                <ReviewSlider reviewResults={reviewCall} />) :
                <p className="text-2xl">No reviews found</p>}
        </section>
    );
};

export default Review;
