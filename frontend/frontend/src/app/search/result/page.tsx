import Image from "next/image";
import Link from "next/link";

const posterpath = "https://image.tmdb.org/t/p/original/";

async function getSearchMovieData(searchParams: any) {
  const searchMovie = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${searchParams.search}&api_key=e4d2477534d5a54cb6f0847a0ee853eb`,
    {
      cache: "no-store",
    }
  );

  if (!searchMovie.ok) {
    return new Error("data not fetching!");
  }
  console.log(searchMovie);
  return searchMovie.json();
}

const Results = async ({ searchParams } : { searchParams: any }) => {
  const movieResultCall = await getSearchMovieData(searchParams);
  const movieData = movieResultCall.results;

  return (
    <div>
      <div className="w-[90%] m-auto h-full p-3">
        <h1 className="text-center text-3xl my-5">
          Search Results For:{" "}
          <span className="font-bold capitalize">{searchParams.search}</span>
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:grid-cols-5">
          {movieData.map((movie: any, index: number) =>
            movie.poster_path ? (
              <div key={index} className="w-1/8 p-3">
                <Link href={`/movies/${movie.id}`}>
                  <Image
                    src={posterpath + movie.poster_path}
                    alt={`${movie.original_title}`}
                    width={200}
                    height={200}
                    objectFit="cover"
                    className="cursor-pointer"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0dgn9DwADSwHNRhjk3gAAAABJRU5ErkJggg=="
                    unoptimized
                  />
                </Link>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;
