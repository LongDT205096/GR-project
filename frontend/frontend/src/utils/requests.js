const API_KEY = 'e4d2477534d5a54cb6f0847a0ee853eb'
const BASE_URL = 'https://api.themoviedb.org/3'

const requests = {
  fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US&append_to_response=images`,
  fetchNetflixOriginals: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `${BASE_URL}?api_key=${API_KEY}&language=en-US&with_genres=28`,
  fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`,
  fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
  fetchRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`,
  fetchDocumentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`,
  fetchSeriesDetails: `${BASE_URL}/tv/`,
  fetchMovieDetails: "/movie/",
  fetchActorDetails: "/actor/",
  fetchLatestTvSeries: `${BASE_URL}/discover/tv?api_key=${API_KEY}`,
  fetchPerson: `${BASE_URL}/person/`,
  fetchOttTv: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=`,
  fetchGenre: `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`,
  fetchGenreMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=`,
  fetchLatestMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US,ta,te`,
  fetchTamilMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=ta&sort_by=primary_release_date.desc`,
  fetchTeluguMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=te&sort_by=primary_release_date.desc`,
  fetchHindiMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=hi&sort_by=primary_release_date.desc`,
  fetchAllLanguageMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=`,

}

export default requests
    