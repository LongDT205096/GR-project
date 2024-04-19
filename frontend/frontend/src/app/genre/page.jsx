import React from "react";

import Link from "next/link";
import axios from "axios";
import movie_request from "@/utils/movie";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://127.0.0.1:8000/';

async function getGenreResponse() {
  const GenreApiresponse = await axios.get(movie_request.fetchGenre, {
    headers: {
        'Content-Type': 'application/json'
    }
});

  if (GenreApiresponse.status !== 200) {
    return new Error("data not fetching!");
  }

  return GenreApiresponse.data;
}

const Genre = async () => {
  const genreData = await getGenreResponse();

  return (
    <div>
      <div className="w-[85%] mx-auto text-2xl my-5">
        <h1>Genre</h1>
      </div>
      <div className="w-full h-full p-5 grid md:grid-cols-3 grid-cols-1 gap-4 justify-center items-center">
        {genreData.map((genre, index) => (
          <Link href={`/genres/${genre.id}/page/1`} key={index}>
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
