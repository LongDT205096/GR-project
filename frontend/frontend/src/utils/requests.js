const API_KEY = 'e4d2477534d5a54cb6f0847a0ee853eb'
const BASE_URL = 'https://api.themoviedb.org/3'

const requests = {
    fetchTrending: "/movie/trending",
    fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchMovieDetails: "/movie/",
    fetchActorDetails: "/actor/",
    fetchDirectorDetails: "/director/",
    fetchGenre: `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`,
    fetchGenreMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=`,
    fetchLatestMovies: '/movie/latest',
    fetchTamilMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=ta&sort_by=primary_release_date.desc`,
    fetchTeluguMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=te&sort_by=primary_release_date.desc`,
    fetchHindiMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=hi&sort_by=primary_release_date.desc`,
    fetchAllLanguageMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=`,
}

// const requests = {
//     fetchMovieDetails: "/movie/",
//     fetchActorDetails: "/actor/",
//     fetchDirectorDetails: "/director/",
//     fetchTrending: "/movie/trending",
//     fetchLatestMovies: "/movie/latest",
// }

export default requests
    