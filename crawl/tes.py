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

with open("movie_error.json", "r") as f:
    data = json.load(f)
    f.close()
driver = webdriver.Chrome()
for movie in data:
    if "director" not in movie.keys():
        data.remove(movie)

with open("movie_error.json", "w") as f:
    json.dump(data, f, indent=4)

        
        