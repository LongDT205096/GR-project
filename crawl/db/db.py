import mysql.connector
import json

class Director:
    def __init__(self, name, place_of_birth, biography, birthday, deathday):
        self.name = name
        self.place_of_birth = place_of_birth
        self.biography = biography
        self.birthday = birthday
        self.deathday = deathday


def add_director_table(mydb, mycursor):
    with open('../data/director_details.json', "r") as f:
        datas = json.load(f)
    for data in datas:
        director = Director(data["name"], data["place_of_birth"], data["biography"], data["birthday"], data["deathday"])
        query = "INSERT INTO Director_director (name, place_of_birth, biography, birthday, deathday) VALUES (%s, %s, %s, %s, %s)"
        values = (director.name, director.place_of_birth, director.biography, director.birthday, director.deathday)
        mycursor.execute(query, values)
        mydb.commit()
    

class Movie:
    def __init__(self, title, release_date, duration, summary, synopsis, director_id, budget, original_country, revenue):
        self.title = title
        self.release_date = release_date
        self.duration = duration
        self.summary = summary
        self.synopsis = synopsis
        self.director_id = director_id
        self.budget = budget
        self.original_country = original_country
        self.revenue = revenue


def add_movie_table(mydb, mycursor):
    with open('../data/movie_details.json', "r") as f:
        datas = json.load(f)

    count = 0
    for data in datas:
        if count == 100:
            break
        movie = Movie(data["title"], data["release_date"], data["duration"], data["summary"], data["synopsis"], data["director_id"] + 1, data["budget"], data["origin_country"][0], data["revenue"])
        query = "INSERT INTO Movie_movie (title, release_date, duration, summary, synopsis, director_id, budget, original_country, revenue) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
        values = (movie.title, movie.release_date, movie.duration, movie.summary, movie.synopsis, movie.director_id, movie.budget, movie.original_country, movie.revenue)
        mycursor.execute(query, values)
        mydb.commit()
        count += 1
    

def add_movie_image(mydb, mycursor):
    with open('../data/movie_images.json', "r") as f:
        datas = json.load(f)
    for data in datas:
        query = "INSERT INTO Movie_movieimage (movie_id, image, type) VALUES (%s, %s, %s)"
        values = (data["id"], data["path"], data["type"])
        mycursor.execute(query, values)
        mydb.commit()


def add_movie_video(mydb, mycursor):
    with open('../data/movie_videos_list.json', "r") as f:
        datas = json.load(f)
    for data in datas:
        query = "INSERT INTO Movie_movievideo (movie_id, title, link, type) VALUES (%s, %s, %s, %s)"
        values = (data["movie_id"], data["name"], data["key"], data["type"])
        mycursor.execute(query, values)
        mydb.commit()


class Actor:
    def __init__(self, name, place_of_birth, biography, birthday, deathday):
        self.name = name
        self.place_of_birth = place_of_birth
        self.biography = biography
        self.birthday = birthday
        self.deathday = deathday

def add_actor_table(mydb, mycursor):
    with open('../data/actor_details.json', "r") as f:
        datas = json.load(f)
    for data in datas:
        actor = Actor(data["name"], data["place_of_birth"], data["biography"], data["birthday"], data["deathday"])
        query = "INSERT INTO Actor_actor (name, place_of_birth, biography, birthday, deathday) VALUES (%s, %s, %s, %s, %s)"
        values = (actor.name, actor.place_of_birth, actor.biography, actor.birthday, actor.deathday)
        mycursor.execute(query, values)
        mydb.commit()
        print(f"Actor {actor.name} added to the database")


def add_movie_actor_table(mydb, mycursor):
    with open('../data/movie_crew_list_2.json', "r") as f:
        datas = json.load(f)
    movie_keys = list(datas.keys())
    for key in movie_keys:
        for data in datas[key]:
            query = "INSERT INTO Movie_movie_actor (movie_id, actor_id, character_name) VALUES (%s, %s, %s)"
            values = (data["movie_id"], data["db_id"], data["character"])
            mycursor.execute(query, values)
            mydb.commit()
            print(f"Movie {data['movie_id']} and Actor {data['actor_id']} added to the database")


def add_actor_image(mydb, mycursor):
    with open('../data/actor_images.json', "r") as f:
        datas = json.load(f)
    for data in datas:
        query = "INSERT INTO Actor_actorimage (actor_id, image) VALUES (%s, %s)"
        values = (data["actor_id"], data["image"])
        mycursor.execute(query, values)
        mydb.commit()


def main():
    mydb = mysql.connector.connect(
    host="final-gr.cvu4iu82orkw.ap-southeast-2.rds.amazonaws.com",
    user="root",
    password="adminroot",
    database="final_gr"
    )
    mycursor = mydb.cursor()
    add_actor_image(mydb, mycursor)
    mycursor.close()

if __name__ == "__main__":
    main()
