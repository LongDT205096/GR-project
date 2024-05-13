BASE_URL = 'https://api.themoviedb.org/3'
API_KEY = 'e4d2477534d5a54cb6f0847a0ee853eb'

fetch_request = {
    'fetchActionMovies': f'{BASE_URL}/discover/movie?api_key={API_KEY}&language=en-US&with_genres=28',
    'fetchComedyMovies': f'{BASE_URL}/discover/movie?api_key={API_KEY}&language=en-US&with_genres=35',
    'fetchMovieDetails': f'{BASE_URL}/movie/',
}
