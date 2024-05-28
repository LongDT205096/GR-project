"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineHeart } from "react-icons/ai";
import { FaList } from "react-icons/fa";

const WatchlistIcon = ({ favMovie }: { favMovie: string }) => {
    const movieId = favMovie;
    const [isFavorited, setIsFavorited] = useState(false);

    return (
        <div>
            {isFavorited ? (
                <FaList
                    className="text-red-600 my-auto rounded-full cursor-pointer"
                    // onClick={handleRemoveFavorite}
                />
            ) : (
                <FaList
                    className="text-white my-auto cursor-pointer"
                    // onClick={handleFavoriteClick}
                />
            )}
        </div>
    );
};

export default WatchlistIcon;
