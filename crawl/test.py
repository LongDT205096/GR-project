from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pprint as pp
import json

from request import fetch_request


def export_to_json(data, file_name):
    with open(file_name, 'a') as f:
        json.dump(data, f, indent=4)


# def get_movie_list(driver):
#     movies = []
#     with open('movie_list.json', 'a') as f:
#         for i in range(1, 501):
#             driver.get(f'{fetch_request["fetchActionMovies"]}&page={i}')
#             data = json.loads(driver.find_element(By.TAG_NAME, 'body').text).get('results')
#             for d in data:
#                 movies.append({
#                     d.get('id'): d.get('title')
#                 })
#             print(f'Page {i} done')
#         json.dump(movies, f, indent=4)
#
#
# def get_movie_details(driver):
#     file = open('movies.json', 'r')
#     data = json.load(file)
#     movie_list = []
#     movie_id = 0
#
#     with open('movie_details_list.json', 'w') as f:
#         for movie in data:
#             driver.get(f'{fetch_request["fetchMovieDetails"]}{list(movie.keys())[0]}?api_key=e4d2477534d5a54cb6f0847a0ee853eb')
#             details = json.loads(driver.find_element(By.TAG_NAME, 'body').text)
#             movie_list.append({
#                 "id": list(movie.values())[0],
#                 "imdb_id": list(movie.keys())[0],
#                 "title": details.get('title'),
#                 "release_date": details.get('release_date'),
#                 "duration": details.get('runtime'),
#                 "ave_rate": str(0.0),
#                 "poster_path": details.get('poster_path'),
#                 "backdrop_path": details.get('backdrop_path'),
#                 "origin_country": details.get('origin_country'),
#                 "summary": details.get('overview'),
#                 "revenue": details.get('revenue'),
#                 "budget": details.get('budget'),
#                 "genres": [genre.get('name') for genre in details.get('genres')],
#             })
#             print(movie_id, f'{movie["title"]} done')
#             movie_id += 1
#         json.dump(movie_list, f, indent=4)


def get_movie_imdb_id(driver):
    file = open('movie_list.json', 'r')
    data = json.load(file)
    imdb_ids = []
    with open('movie_imdb_id.json', 'w') as f:
        for movie in data:
            tmdb_id = list(movie.keys())[0]
            driver.get(f'{fetch_request["fetchMovieDetails"]}{tmdb_id}/external_ids?api_key=e4d2477534d5a54cb6f0847a0ee853eb')
            details = json.loads(driver.find_element(By.TAG_NAME, 'body').text)
            imdb_ids.append({
                movie[tmdb_id]: details['imdb_id']
            })
            print(f'{movie["id"]} {movie[tmdb_id]} done')
        json.dump(imdb_ids, f, indent=4)


def get_movie_synopsis(driver):
    file = open('movie_imdb_id.json', 'r')
    data = json.load(file)
    with open('movie_synopsis.json', 'a') as f:
        count = 0
        for movie in data:
            status: str
            imdb_id = list(movie.values())[0]
            driver.get(f'https://www.imdb.com/title/{imdb_id}/plotsummary/?ref_=tt_stry_pl#synopsis')
            driver.execute_script("window.scrollTo(0, 5000);")
            try:
                html = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, '/html/body/div[2]/main/div/section/div/section/div/div[1]/section[2]/div[2]/ul/li')))
                details = html.text
                status = "success"
            except:
                details = ""
                status = "null"

            synopsis = {
                list(movie.keys())[0]: details
            }
            print(f'{count} {list(movie.keys())[0]} {status}')
            count += 1
            json.dump(synopsis, f, indent=4)
            f.write(',\n')


def get_movie_videos(driver):
    file = open('movie_list.json', 'r')
    data = json.load(file)
    videos = []
    with open('movie_videos_list.json', 'w') as f:
        for movie in data:
            tmdb_id = list(movie.keys())[0]
            movie_id = movie["id"]
            driver.get(f'{fetch_request["fetchMovieDetails"]}{tmdb_id}/videos?api_key=e4d2477534d5a54cb6f0847a0ee853eb')
            details = json.loads(driver.find_element(By.TAG_NAME, 'body').text).get('results')

            for video in details:
                videos.append({
                    "movie_id": movie_id,
                    "name": video.get('name'),
                    "key": video.get('key'),
                    "type": video.get('type')
                })
            print(f'Page {movie_id} {movie[tmdb_id]} done')
        json.dump(videos, f, indent=4)


def get_movie_images(driver, movie_id):
    images = []
    driver.get(f'{fetch_request["fetchMovieDetails"]}{movie_id}/images?api_key=e4d2477534d5a54cb6f0847a0ee853eb')
    data = json.loads(driver.find_element(By.TAG_NAME, 'body').text)
    backdrops = data['backdrops']
    posters = data['posters']
    logos = data['logos']
    for image in backdrops:
        images.append({
            "movie_id": movie_id,
            "backdrop_path": image['file_path'],
            "type": "backdrop"
        })

    for image in posters:
        images.append({
            "movie_id": movie_id,
            "poster_path": image['file_path'],
            "type": "poster"
        })

def main():
    driver = webdriver.Chrome()
    # get_movie_synopsis(driver)
    # get_movie_imdb_id(driver)

if __name__ == '__main__':
    main()
