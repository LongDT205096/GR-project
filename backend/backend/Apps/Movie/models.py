from django.db import models

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

    def __str__(self) -> str:
        return self.name


class Movie(models.Model):
    title = models.CharField(max_length=50)
    release_date = models.DateField()
    duration = models.IntegerField()
    ave_rate = models.FloatField(default=0.0)
    summary = models.CharField(max_length=2000, blank=True, null=True)
    synopsis = models.TextField(max_length=15000, blank=True, null=True)
    trailer = models.URLField(max_length=500, blank=True, null=True)
    poster = models.URLField(max_length=500, blank=True, null=True)
    genres = models.ManyToManyField(Genre)
    director = models.ForeignKey("Director.Director", on_delete=models.CASCADE)
    actors = models.ManyToManyField("Actor.Actor")

    def __str__(self) -> str:
        return self.title

