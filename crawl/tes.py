import json
import random


f = open("movie_list.json", "r")
data = json.load(f)
f.close()
print(len(data))
choice = random.sample(data, 1000)
movie_id = [movie["id"]-1701 for movie in choice]
movie_id = sorted(movie_id)
movie_id.reverse()

movie_detail_id = [movie["id"] for movie in choice]
movie_detail_id = sorted(movie_detail_id)
movie_detail_id.reverse()

with open("movie_list.json", "w") as f:
    print(len(data))
    for m_id in movie_id:
        data.pop(m_id)
    print(len(data))
    json.dump(data, f, indent=4)

with open("movie_details_list.json", "r") as f:
    data_details = json.load(f)
    print(len(data_details))
    f.close()

with open("movie_details_list.json", "w") as f:
    for m_id in movie_detail_id:
        data_details.pop(m_id)
    print(len(data_details))
    json.dump(data_details, f, indent=4)


