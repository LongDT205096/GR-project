from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from .models import Movie, Genre, MovieImage, MovieVideo
from .serializer import (
    GenreSerializer,
    MovieSerializer,
    MovieBannerSerializer
)

from ..Actor.models import Actor
from ..Director.models import Director


class MovieDetailView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, pk):
        movie = Movie.objects.get(pk=pk)
        serializer = MovieSerializer(movie)

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
        movie = Movie.objects.all().filter(genres=pk)
        serializer = MovieBannerSerializer(movie, many=True)
        return Response(serializer.data)
