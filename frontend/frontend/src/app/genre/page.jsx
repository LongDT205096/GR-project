import React from "react";

import requests from "@/utils/requests";
import Link from "next/link";


async function getGenreResponse() {
  const GenreApiresponse = await fetch(`${requests.fetchGenre}`, {
    cache: "no-store",
  });

  if (!GenreApiresponse.ok) {
    return new Error("data not fetching!");
  }

  return GenreApiresponse.json();
}

const Genre = async () => {
  const GenreResultData = await getGenreResponse();
  const genredata = GenreResultData.genres;

  return (
    <div>
      <div className="w-[85%] mx-auto text-2xl my-5">
        <h1>Genre</h1>
      </div>
      <div className="w-full h-full p-5 grid md:grid-cols-3 grid-cols-1 gap-4 justify-center items-center">
        {genredata.map((genre, index) => (
          <Link href={`/genre/${genre.id}/page/1`} key={index}>
            <div
              className="genre_container rounded-md"
              style={{
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                paddingTop: "50px",
                paddingBottom: "50px",
              }}
            >
              <h1 className="text-2xl mr-8 font-bold text-center text-white">
                {genre.name}
              </h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Genre;
