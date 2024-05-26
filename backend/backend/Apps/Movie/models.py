from django.db import models
from django.db.models import Avg
from django_countries.fields import CountryField

from ..Rate.models import Rate


class Genre(models.Model):
    GENRE_CHOICES = [
        ('Action', 'Action'),
        ('Adventure', 'Adventure'),
        ('Animation', 'Animation'),
        ('Biography', 'Biography'),
        ('Comedy', 'Comedy'),
        ('Crime', 'Crime'),
        ('Documentary', 'Documentary'),
        ('Drama', 'Drama'),
        ('Family', 'Family'),
        ('Fantasy', 'Fantasy'),
        ('Film-Noir', 'Film-Noir'),
        ('Game-Show', 'Game-Show'),
        ('History', 'History'),
        ('Horror', 'Horror'),
        ('Music', 'Music'),
        ('Musical', 'Musical'),
        ('Mystery', 'Mystery'),
        ('News', 'News'),
        ('Reality-TV', 'Reality-TV'),
        ('Romance', 'Romance'),
        ('Sci-Fi', 'Sci-Fi'),
        ('Short', 'Short'),
        ('Sport', 'Sport'),
        ('Talk-Show', 'Talk-Show'),
        ('Thriller', 'Thriller'),
        ('War', 'War'),
        ('Western', 'Western'),
    ]

    name = models.CharField(max_length=50, choices=GENRE_CHOICES)

    def __str__(self):
        return self.name


class Movie(models.Model):
    title = models.CharField(max_length=50)
    release_date = models.DateField()
    duration = models.IntegerField()
    ave_rate = models.FloatField(default=0.0)
    summary = models.CharField(max_length=2000, blank=True, null=True)
    synopsis = models.TextField(max_length=20000, blank=True, null=True)
    revenue = models.IntegerField(default=0)
    budget = models.IntegerField(default=0)
    original_country = CountryField(blank_label="(select country)", blank=True)
    director = models.ForeignKey("Director.Director", on_delete=models.CASCADE)
    actors = models.ManyToManyField("Actor.Actor")
    genres = models.ManyToManyField(Genre)

    def __str__(self):
        return self.title

    def average_rating(self) -> float:
        return Rate.objects.filter(movie=self).aggregate(Avg('rate'))['rate__avg']

class MovieVideo(models.Model):
    TYPE_CHOICES = [
        ("Trailers", "Trailers"),
        ("Teasers", "Teasers"),
        ("Clips", "Clips"),
        ("Behind the Scene", "Behind the Scene"),
        ("Bloopers", "Bloopers"),
        ("Featurettes", "Featurettes"),
        ("Opening Credits", "Opening Credits"),
    ]

    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    link = models.FileField(null=True, blank=True)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)

    def __str__(self):
        return self.title


class MovieImage(models.Model):
    TYPE_CHOICES = [
        ("backdrops", "backdrop"),
        ("posters", "poster"),
        ("logos", "logo"),
    ]
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="movie/", null=True, blank=True)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)

