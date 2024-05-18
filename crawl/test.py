from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pprint as pp
import json

from request import (
    fetch_request,
    genre_id
)


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
#     file = open('movie_list.json', 'r')
#     data = json.load(file)
#     movie_list = []
#     movie_id = 0

#     with open('movie_details.json', 'w') as f:
#         for movie in data:
#             tmdb_id = list(movie.keys())[0]
#             title = movie[tmdb_id]
#             driver.get(f'{fetch_request["fetchMovieDetails"]}{tmdb_id}?api_key=e4d2477534d5a54cb6f0847a0ee853eb')
#             details = json.loads(driver.find_element(By.TAG_NAME, 'body').text)
#             movie_list.append({
#                 "id": movie_id,
#                 "tmdb_id": tmdb_id,
#                 "title": details.get('title'),
#                 "release_date": details.get('release_date'),
#                 "duration": details.get('runtime'),
#                 "ave_rate": 0.0,
#                 "poster_path": details.get('poster_path'),
#                 "backdrop_path": details.get('backdrop_path'),
#                 "origin_country": details.get('origin_country'),
#                 "summary": details.get('overview'),
#                 "revenue": details.get('revenue'),
#                 "budget": details.get('budget'),
#                 "genres": [genre.get('name') for genre in details.get('genres')],
#             })
#             print(movie_id, f'{title} done')
#             movie_id += 1
#             json.dump(movie_list, f, indent=4)


# def get_movie_synopsis(driver):
#     file = open('movie_imdb_id.json', 'r')
#     data = json.load(file)
#     with open('movie_synopsis.json', 'a') as f:
#         count = 0
#         for movie in data:
#             status: str
#             imdb_id = list(movie.values())[0]
#             driver.get(f'https://www.imdb.com/title/{imdb_id}/plotsummary/?ref_=tt_stry_pl#synopsis')
#             driver.execute_script("window.scrollTo(0, 5000);")
#             try:
#                 html = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, '/html/body/div[2]/main/div/section/div/section/div/div[1]/section[2]/div[2]/ul/li')))
#                 details = html.text
#                 status = "success"
#             except:
#                 details = ""
#                 status = "null"

#             synopsis = {
#                 list(movie.keys())[0]: details
#             }
#             print(f'{count} {list(movie.keys())[0]} {status}')
#             count += 1
#             json.dump(synopsis, f, indent=4)
#             f.write(',\n')


# def get_movie_imdb_id(driver):
#     file = open('movie_list.json', 'r')
#     data = json.load(file)
#     imdb_ids = []
#     with open('movie_imdb_id.json', 'w') as f:
#         for movie in data:
#             tmdb_id = list(movie.keys())[0]
#             driver.get(f'{fetch_request["fetchMovieDetails"]}{tmdb_id}/external_ids?api_key=e4d2477534d5a54cb6f0847a0ee853eb')
#             details = json.loads(driver.find_element(By.TAG_NAME, 'body').text)
#             imdb_ids.append({
#                 movie[tmdb_id]: details['imdb_id']
#             })
#             print(f'{movie["id"]} {movie[tmdb_id]} done')
#         json.dump(imdb_ids, f, indent=4)


def get_movie_videos(driver):
    file = open('movie_details.json', 'r')
    data = json.load(file)
    file.close()

    videos = []
    movie_id = 0
    with open('movie_videos_list.json', 'w') as f:
        for movie in data:
            tmdb_id = movie["imdb_id"]
            driver.get(f'{fetch_request["fetchMovieDetails"]}{tmdb_id}/videos?api_key=e4d2477534d5a54cb6f0847a0ee853eb')
            details = json.loads(driver.find_element(By.TAG_NAME, 'body').text).get('results')

            for video in details:
                videos.append({
                    "movie_id": movie_id,
                    "name": video.get('name'),
                    "key": video.get('key'),
                    "type": video.get('type')
                })
            movie_id += 1
            print(f'{movie_id}. movie {movie["imdb_id"]} done')
        json.dump(videos, f, indent=4)


# def add_director(driver):
#     file = open('movie_details.json', 'r')
#     data = json.load(file)
#     file.close()
#     count = 0
#     rmv_data = []
#     for movie in data:
#         tmdb_id = movie['imdb_id']
#         driver.get(f'{fetch_request["fetchMovieDetails"]}{tmdb_id}/credits?api_key=e4d2477534d5a54cb6f0847a0ee853eb')
#         crew = json.loads(driver.find_element(By.TAG_NAME, 'body').text).get('crew')
#         if not crew:
#             rmv_data.append(movie)
#             data.remove(movie)
#             continue
#         for c in crew:
#             if c.get('job') == 'Director':
#                 movie['director'] = c.get('name')
#                 break
#         if 'director' not in movie:
#             rmv_data.append(movie)
#             data.remove(movie)
#             continue
#         count += 1
#         print(f'{count}. {movie["imdb_id"]} {movie["title"]} with \"{movie["director"]}\" done')
#     print(len(rmv_data))
#     with open('movie_detail_with_director.json', 'w') as f:
#         json.dump(data, f, indent=4)
#         f.close()
#     with open('movie_detail_without_director.json', 'w') as f:
#         json.dump(rmv_data, f, indent=4)
#         f.close()


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


# def get_director(driver):
#     file = open('movie_details.json', 'r')
#     data = json.load(file)
#     file.close()

#     count = 0
#     new_data = set()
#     data_error = []
#     for movie in data:
#         tmdb_id = movie['imdb_id']
#         driver.get(f'{fetch_request["fetchMovieDetails"]}{tmdb_id}/credits?api_key=e4d2477534d5a54cb6f0847a0ee853eb')
#         crew = json.loads(driver.find_element(By.TAG_NAME, 'body').text).get('crew')
#         for c in crew:
#             if c["job"] == 'Director':
#                 id = c["id"]
#                 director = c["name"]
#                 if director != movie['director']:
#                     data_error.append({
#                         'movie_id': tmdb_id,
#                         'director': movie['director'],
#                         'director_found': director,
#                         'director_id': id
#                     })
#                     break
#                 new_data.add(json.dumps({
#                     id: director
#                 }))
#                 break
#         count += 1
#         print(f'{count}. {movie["imdb_id"]} with \"{movie["director"]}\" done')
#     with open('director.json', 'w') as f:
#         new_data = list(new_data)
#         json.dump(new_data, f, indent=4)


def get_director_details(driver):
    file = open('director.json', 'r')
    data = json.load(file)
    file.close()

    count = 0
    with open('director_details.json', 'w') as f:
        for d in data:
            director = json.loads(d)
            for key in director.keys():
                driver.get(f'{fetch_request["fetchPersonDetails"]}{key}?api_key=e4d2477534d5a54cb6f0847a0ee853eb')
                details = json.loads(driver.find_element(By.TAG_NAME, 'body').text)

                info = {
                    "imdb_id": key,
                    "id": count,
                    "name": director[key],
                    "birthday": details.get('birthday'),
                    "deathday": details.get('deathday'),
                    "place_of_birth": details.get('place_of_birth'),
                    "biography": details.get('biography'),
                    "poster": details.get('profile_path'),
                }
                json.dump(info, f, indent=4)
                print(f'{count}. {key} {director[key]} done')
                count += 1

    

def main():
    driver = webdriver.Chrome()
    get_movie_videos(driver)
    

if __name__ == '__main__':
    main()
