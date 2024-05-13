import json

f = open("movies.json")
data = json.load(f)
f.close()
movie_id = []
for d in data:
    movie_id.append(list(d.keys())[0])

movie_set = set(movie_id)
print(len(movie_id))
print(len(movie_set))
