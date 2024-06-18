"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa6";
import axios from "axios";

import requests from "@/utils/requests";

axios.defaults.baseURL = "http://127.0.0.1:8000/";

const WatchlistIcon = ({ favMovie }: { favMovie: string }) => {
    const movieId = favMovie;
    const [isFavorited, setIsFavorited] = useState(false);
    
    const router = useRouter();
    const token = localStorage.getItem("token");
    const api = "account/watchlist/"
    const body = {
        movie: movieId,
    };
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    };
    const handleFavoriteClick = () => {
        if (!token) {
            router.push("/login");
            return;
        };        
        axios.post(api, body, config)
            .then((res) => {
                setIsFavorited(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleRemoveFavorite = () => {
        axios.delete(api, { data: body, headers: config.headers })
            .then((res) => {
                setIsFavorited(false);
            })
            .catch((err) => {
                console.log(err);
            });
        setIsFavorited(false);
    };
    return (
        <div>
            {isFavorited ? (
                <FaHeart 
                    className="text-red-600 my-auto rounded-full cursor-pointer"
                    onClick={handleRemoveFavorite}
                />
            ) : (
                <FaHeart 
                    className="text-white my-auto cursor-pointer"
                    onClick={handleFavoriteClick}
                />
            )}
        </div>
    );
};

export default WatchlistIcon;
