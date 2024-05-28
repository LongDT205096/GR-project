import axios from "axios";

import requests from "@/utils/requests";
import ReviewSlider from "./ReviewSlider";

axios.defaults.baseURL = "https://127.0.0.1:8000/";

async function getMovieReview(movieid: String) {
    const api = requests.fetchMovieDetails + movieid + "/reviews/";
    const movieReview = await axios.get(api)
        .then((response) => {
            console.log(response.data)
            return response.data;
        })
    return movieReview;
}

const Review = async ({ movieid }: { movieid: string }) => {
    const reviewCall = await getMovieReview(movieid);
    const reviewResults = reviewCall.results;

    return (
        <section className="mx-auto my-8">
            <div className="flex heading justify-between">
                <div className="flex items-center space-x-2 mb-4">
                    <div className="w-1 rounded-sm h-full bg-white"></div>
                    <h1 className="text-4xl my-2">Review</h1>
                </div>

                <button className="flex space-x-2 text-2xl items-center">
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
                    </svg>
                    <p>New review</p>
                </button>
            </div>
            {reviewResults && reviewResults.length > 0 ? (
                <ReviewSlider reviewResults={reviewResults} />) :
                <p className="text-2xl">No reviews found</p>}
        </section>
    );
};

export default Review;
