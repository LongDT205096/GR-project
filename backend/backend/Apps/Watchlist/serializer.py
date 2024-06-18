from rest_framework import serializers
from .models import Watchlist_Movie

from ..Movie.serializer import MovieBannerSerializer


class WatchlistSerializer(serializers.ModelSerializer):
    movies = serializers.SerializerMethodField()

    def get_movies(self, obj):
        datas = Watchlist_Movie.objects.filter(watchlist=obj)
        movies = []
        for data in datas:
            movie = MovieBannerSerializer(data.movie).data
            movies.append(movie)
        return movies

    class Meta:
        model = Watchlist_Movie
        fields = ['movies']


class AddToWatchlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Watchlist_Movie
        fields = '__all__'
