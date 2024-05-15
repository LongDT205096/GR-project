"use client";
import { useEffect, useState } from "react";
import requests from "@/utils/requests";
import Loader from "./Loader";
import Popups from "./Popups";

async function getMovieVideo(movieId: string) {
    const VideoApiresponse = await fetch(
        `${requests.fetchMovieDetails}${movieId}/videos?api_key=e4d2477534d5a54cb6f0847a0ee853eb`,
        {
            cache: "no-store",
        }
    );

    if (!VideoApiresponse.ok) {
        return new Error("data not fetching!");
    }

    return VideoApiresponse.json();
}

const Trailer = ({ movieId }: { movieId: string }) => {
    const [trailervideo, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const video = await getMovieVideo(movieId);
                if (video.results[0] != null) {
                    setVideo(video.results[0]);
                } else {
                    setVideo(null);
                }
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        };
        fetchVideo();
    }, [movieId]);

    return (
        <div>
            <button
                popup-btn-1="true"
                className={`py-2 px-5 bg-white/30 my-3 text-sm backdrop-blur ${trailervideo == null ? "hidden" : ""
                    } hover:bg-white/20 cursor-pointer text-white`}
            >
                Watch Trailer
            </button>

            <Popups targetItem="1">
                {loading && <Loader />}
                {!loading && trailervideo && (
                    <iframe
                        src={`https://www.youtube.com/embed/${(trailervideo as { key: string }).key}`}
                        className="w-full h-full"
                        allow="fullscreen;"
                    ></iframe>
                )}
            </Popups>
        </div>
    );
};

export default Trailer;
