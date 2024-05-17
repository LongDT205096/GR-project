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


def convert_to_json():
    with open("movie_synopsis.json", "r") as f:
        data = json.load(f) 
        f.close()
    new_data = {}
    for d in data:
        title = list(d.keys())[0]
        synopsis = d[title]
        new_data[title] = synopsis
    
    with open("movie_synopsis.json", "w") as f:
        json.dump(new_data, f, indent=4)


def add_synopsis():
    with open("movie_details_list.json", "r") as f:
        data = json.load(f)
        f.close()
    new_data = []
    with open("movie_synopsis.json", "r") as f:
        synopsis = json.load(f)
        f.close()
    for movie in data:
        title = movie["title"]
        try:
            movie["synopsis"] = synopsis[title]
        except:
            movie["synopsis"] = ""
        new_data.append(movie)
    print(len(new_data))                  
    with open("movie_details.json", "w") as f:
        json.dump(new_data, f, indent=4)


def main():
    add_synopsis()

if __name__ == "__main__":
    main()
