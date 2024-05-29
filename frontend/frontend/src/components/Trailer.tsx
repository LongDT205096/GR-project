"use client";
import { useEffect, useState } from "react";
import axios from 'axios';
import { FaPlay } from "react-icons/fa";
import requests from "@/utils/requests";
import Loader from "./Loader";
import Popups from "./Popups";

axios.defaults.baseURL = "http://127.0.0.1:8000/";

async function getMovieVideo(movieId: string) {
    const api = requests.fetchMovieDetails + movieId + "/videos/";
    const VideoApiresponse = await axios.get(api)
        .then((response) => {
            return response.data;
        })
    return VideoApiresponse;
}

const Trailer = ({ movieId }: { movieId: string }) => {
    const [trailervideo, setVideo] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const video = await getMovieVideo(movieId);
                if (video.trailer[0] != "") {
                    setVideo(video.trailer[0].link);
                } else {
                    setVideo("");
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
                className={`flex items-center justify-center rounded-full bg-black px-4 py-3 ${trailervideo == null ? "hidden" : ""
                    } hover:bg-white/20 cursor-pointer text-white`}><FaPlay className="mr-2"></FaPlay>
                    Watch Trailer
            </button>

            <Popups targetItem="1">
                {loading && <Loader />}
                {!loading && trailervideo && (
                    <iframe
                        src={`https://www.youtube.com/embed${trailervideo}`}
                        className="w-full h-full"
                        allow="fullscreen;"
                    ></iframe>
                )}
            </Popups>
        </div>
    );
};

export default Trailer;
