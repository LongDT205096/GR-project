from django.db import models

# Create your models here.

class Genre(models.Model):
    GENRE_CHOICES = [
        ("Action", "Action"),
        ("Adventure", "Adventure"),
        ("Comedy", "Comedy"),
        ("Drama", "Drama"),
        ("Fantasy", "Fantasy"),
        ("Historical", "Historical"),
        ("Horror", "Horror"),
        ("Mystery", "Mystery"),
        ("Philosophical", "Philosophical"),
        ("Political", "Political"),
        ("Romance", "Romance"),
        ("Science Fiction", "Science Fiction"),
        ("Thriller", "Thriller"),
        ("Western", "Western"),
    ]

    name = models.CharField(max_length=50, choices=GENRE_CHOICES)

    def __str__(self) -> str:
        return self.name


class Movie(models.Model):
    title = models.CharField(max_length=50)
    release_date = models.DateField()
    duration = models.IntegerField()
    rate = models.FloatField()
    genres = models.ManyToManyField(Genre)
    director = models.ForeignKey("Director.Director", on_delete=models.CASCADE)
    actors = models.ManyToManyField("Actor.Actor")

    def __str__(self) -> str:
        return self.title
