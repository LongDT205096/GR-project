from django.contrib import admin
from .models import Movie, Genre, Trailer, Image

# Register your models here.
admin.site.register(Movie)
admin.site.register(Genre)
admin.site.register(Trailer)
admin.site.register(Image)
