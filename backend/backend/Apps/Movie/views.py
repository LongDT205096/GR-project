from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from .models import Movie, Genre, MovieImage, MovieVideo, Movie_Genre
from .serializer import (
    GenreSerializer,
    MovieSerializer,
    MovieBannerSerializer,
    MovieImageSerializer,
    MovieVideoSerializer,
    MovieActorSerializer
)

from ..Actor.models import Actor
from ..Director.models import Director


class MovieDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        movie = Movie.objects.get(pk=pk)
        serializer = MovieSerializer(movie)

        return Response(serializer.data)


class MovieImageView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, pk):
        movie = Movie.objects.get(pk=pk)
        serializer = MovieImageSerializer(movie)
        return Response(serializer.data)


class MovieVideoView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, pk):
        movie = Movie.objects.get(pk=pk)
        serializer = MovieVideoSerializer(movie)
        return Response(serializer.data)
    

class MovieActorView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, pk):
        movie = Movie.objects.get(pk=pk)
        serializer = MovieActorSerializer(movie)
        return Response(serializer.data)


class GenreListView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        genres = Genre.objects.all()
        serializer = GenreSerializer(genres, many=True)
        return Response(serializer.data)


class MovieByGenreView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, pk):
        data = Movie_Genre.objects.all().filter(genre=pk)
        return Response({
            "result": [MovieBannerSerializer(Movie.objects.get(movie=movie.movie)) for movie in data]
        })


class TrendingMoviesView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        movie = Movie.objects.all().order_by('-ave_rate')[:15]
        serializer = MovieBannerSerializer(movie, many=True)
        return Response(serializer.data)


class LatestMoviesView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        movie = Movie.objects.all().order_by('-release_date')[:20]
        serializer = MovieBannerSerializer(movie, many=True)
        return Response(serializer.data)
