"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineHeart } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";

const FavoriteIcon = ({ favMovie }: { favMovie: string }) => {
    const movieId = favMovie;


    const [isFavorited, setIsFavorited] = useState(false);

    return (
        <div>
            {isFavorited ? (
                <FaHeart
                    className="text-red-600 my-auto rounded-full cursor-pointer"
                    // onClick={handleRemoveFavorite}
                />
            ) : (
                <FaHeart
                    className="text-white my-auto cursor-pointer"
                    // onClick={handleFavoriteClick}
                />
            )}
        </div>
    );
};

export default FavoriteIcon;
