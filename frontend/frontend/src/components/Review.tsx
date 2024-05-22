import requests from "@/utils/requests";
import ReviewSlider from "./ReviewSlider";

async function getMovieReview(movieid: String) {
    const movieReview = await fetch(
        `${requests.fetchMovieDetails}${movieid}/reviews?api_key=e4d2477534d5a54cb6f0847a0ee853eb`
    );

    if (!movieReview.ok) {
        return new Error("Review Data Not Fetched!");
    }
    return movieReview.json();
}

const Review = async ({ movieid }: { movieid: string }) => {
    const reviewCall = await getMovieReview(movieid);
    const reviewResults = reviewCall.results;

    return (
        <div className="w-[90%] mx-auto">
            <div className="heading">
                {reviewResults && reviewResults.length > 0 ? (
                    <h1 className="text-2xl my-3">Review</h1>
                ) : null}
            </div>
            <ReviewSlider reviewResults={reviewResults} />
        </div>
    );
};

export default Review;
