import Banner from "@/components/Banner";
import SwipableSlider from "@/components/SwipableSlider";
// import SeriesSlider from "@/components/SeriesSlider";
import UpcomingRelease from "@/components/UpcomingRelease";
import requests from "@/utils/requests";
import { BiSolidChevronRight } from "react-icons/bi";
import Link from "next/link";


async function getBannerResponse() {
  const Apiresponse = await fetch(`${requests.fetchTrending}`, {
    cache: "no-store",
  });

  if (!Apiresponse.ok) {
    return new Error("data not fetching!");
  }

  return Apiresponse.json();
}
async function getLatestMovies() {
  const latestMoviesApiresponse = await fetch(`${requests.fetchLatestMovies}`, {
    cache: "no-store",
  });

  if (!latestMoviesApiresponse.ok) {
    return new Error("data not fetching!");
  }

  return latestMoviesApiresponse.json();
}
async function getTopRated() {
  const Apiresponse = await fetch(`${requests.fetchTopRated}`, {
    cache: "no-store",
  });

  if (!Apiresponse.ok) {
    return new Error("data not fetching!");
  }

  return Apiresponse.json();
}

async function getTamilMovies() {
  const currentDate = new Date();

  const nextWeekDate = new Date(currentDate);
  nextWeekDate.setDate(currentDate.getDate() + 7);

  const CurrentDate = formatDate(currentDate);
  const NextWeekDate = formatDate(nextWeekDate);


  const TamilMovieApiresponse = await fetch(`${requests.fetchTamilMovies}&primary_release_date.lte=${CurrentDate}`, {
    cache: "no-store",
  });

  if (!TamilMovieApiresponse.ok) {
    return new Error("data not fetching!");
  }

  return TamilMovieApiresponse.json();
}

async function getTeluguMovies() {

  const currentDate = new Date();

  const nextWeekDate = new Date(currentDate);
  nextWeekDate.setDate(currentDate.getDate() + 7);

  const CurrentDate = formatDate(currentDate);
  const NextWeekDate = formatDate(nextWeekDate);


  const TeluguMovieApiresponse = await fetch(`${requests.fetchTeluguMovies}&primary_release_date.lte=${CurrentDate}`, {
    cache: "no-store",
  });

  if (!TeluguMovieApiresponse.ok) {
    return new Error("data not fetching!");
  }

  return TeluguMovieApiresponse.json();
}
async function getHindiMovies() {

  const currentDate = new Date();

  const nextWeekDate = new Date(currentDate);
  nextWeekDate.setDate(currentDate.getDate() + 7);

  const CurrentDate = formatDate(currentDate);


  const HindiMovieApiresponse = await fetch(`${requests.fetchHindiMovies}&primary_release_date.lte=${CurrentDate}`, {
    cache: "no-store",
  });

  if (!HindiMovieApiresponse.ok) {
    return new Error("data not fetching!");
  }

  return HindiMovieApiresponse.json();
}

async function getLatestTvSeries() {
  const Apiresponse = await fetch(`${requests.fetchLatestTvSeries}`, {
    cache: "no-store",
  });

  if (!Apiresponse.ok) {
    return new Error("data not fetching!");
  }

  return Apiresponse.json();
}
async function getUpcomingMovies() {
  const currentDate = new Date();

  const nextWeekDate = new Date(currentDate);
  nextWeekDate.setDate(currentDate.getDate() + 7);

  const CurrentDate = formatDate(currentDate);
  const NextWeekDate = formatDate(nextWeekDate);

    const UpcomingApiresponse = await fetch(`${requests.fetchMovieDetails}upcoming?api_key=e4d2477534d5a54cb6f0847a0ee853eb&languages=en-US&primary_release_date.gte=${CurrentDate}&primary_release_date.lte=${NextWeekDate}`, {
        cache: "no-store",
    });

  if (!UpcomingApiresponse.ok) {
    return new Error("data not fetching!");
  }

  return UpcomingApiresponse.json();
}


function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const Home = async () => {
  const trend = await getBannerResponse();
  const TrendingData = trend.results;
  const latestMovies = await getLatestMovies();
  const latestMoviesData = latestMovies.results;
  const upComingMovies = await getUpcomingMovies();
  const UpcomingMoviesData = upComingMovies.results;
  const toprated = await getTopRated();
  const TopRated = toprated.results;
  const latestTvSeries = await getLatestTvSeries();
  const latestTvSeriesData = latestTvSeries.results;

  return (
    <div>
      <Banner bannerContent={TrendingData} />
      <div className="latestReleases my-5 w-full ml-auto">
        <div className="sm:ml-16 ml-0 latestinner h-full overflow-hidden">
          <div className="heading md:mx-0 mx-auto md:w-auto w-[90%]">
            <div className="w-full flex justify-between items-center">
              <h1 className="text-2xl my-3 font-bold">Latest Releases</h1>
              <Link className="cursor-pointer" href={"/movie/page/1"}>
                <BiSolidChevronRight className="text-white text-2xl w-6 h-6 mx-3" />
              </Link>
            </div>
          </div>
          <div>
            <SwipableSlider Categories={latestMoviesData} />
          </div>
        </div>
      </div>
      <div className="latestReleases my-5 w-full ml-auto">
        <div className="sm:ml-16 ml-0 latestinner h-full overflow-hidden">
          <div className="heading md:mx-0 mx-auto md:w-auto w-[90%]">
            <div className="w-full flex justify-between items-center">
              <h1 className="text-2xl my-3">Top Rated</h1>
              <Link className="cursor-pointer" href={"/toprated/page/1"}>
                <BiSolidChevronRight className="text-white text-2xl w-6 h-6 mx-3" />
              </Link>
            </div>
          </div>
          <SwipableSlider Categories={TopRated} />
        </div>
      </div>
      <div className="my-5 w-full ml-auto">
        <div className="sm:ml-16 ml-0 latestinner h-full overflow-hidden">

          <UpcomingRelease upcomingdata={UpcomingMoviesData} />
        </div>
      </div>
      <div className="latestReleases my-5 w-full ml-auto">
        <div className="sm:ml-16 ml-0 latestinner h-full overflow-hidden">
          <div className="heading md:mx-0 mx-auto md:w-auto w-[90%]">
            <div className="w-full flex justify-between items-center">
              <h1 className="text-2xl my-3">Latest Tv Series</h1>
              <Link className="cursor-pointer" href={"/latestSeries/page/1"}>
                <BiSolidChevronRight className="text-white text-2xl w-6 h-6 mx-3" />
              </Link>
            </div>
          </div>
          <SwipableSlider Categories={latestTvSeriesData} />
        </div>
      </div>
    </div>
  );
};

export default Home;
