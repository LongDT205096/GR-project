import json


def remove_duplicates():
    with open("movie_details.json", "r") as f:
        data = json.load(f)
        f.close()
    new_data = []
    for movie in data:
        movie.pop("id")
        movie = json.dumps(movie)
        new_data.append(movie)

    new_data = set(new_data)
    new_data = [json.loads(movie) for movie in new_data]
    with open("movie_details_list.json", "w") as f:
        json.dump(new_data, f, indent=4)


def remove_duplicate_movies():
    with open("movies.json", "r") as f:
        data = json.load(f)
        f.close()

    new_data = []
    for movie in data:
        new_movie = {
            list(movie.keys())[0]: movie["title"]
        }
        new_data.append(json.dumps(new_movie))
    new_data = set(new_data)
    new_data = [json.loads(movie) for movie in new_data]
    with open("movie_list.json", "w") as f:
        json.dump(new_data, f, indent=4)
    print(len(new_data))


def sort_data():
    with open("movie_details_list.json", "r") as f:
        data = json.load(f)
        sorted_data = sorted(data, key=lambda x: list(x.values())[1])
        f.close()
    with open("movie_details_list.json", "w") as f:
        json.dump(sorted_data, f, indent=4)


def main():
    movie_id = 1701
    with open("movie_list.json", "r") as f:
        data = json.load(f)
        f.close()

    with open("movie_list.json", "w") as f:
        for movie in data:
            movie["id"] = movie_id
            movie_id += 1
        json.dump(data, f, indent=4)
        f.close()


if __name__ == "__main__":
    main()
