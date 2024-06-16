from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.db.models import Prefetch

from ..Recommendation.cache import recommendations
from .models import Movie, Genre, Movie_Genre, MovieImage
from .serializer import (
    GenreSerializer,
    MovieSerializer,
    MovieBannerSerializer,
    MovieImageSerializer,
    MovieVideoSerializer,
    MovieActorSerializer
)


class MovieDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        helo = recommendations
        print(helo)
        movie = Movie.objects.select_related('director').prefetch_related(
            Prefetch('movie_genre', queryset=Movie_Genre.objects.select_related('genre')),
            Prefetch('movieimage_set', queryset=MovieImage.objects.filter(type__in=['poster', 'backdrop', 'logo']))
        ).get(pk=pk)
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


from elasticsearch_dsl import Q
from .documents import MovieDocument


class SearchMovieView(APIView):
    permission_classes = [AllowAny]
    document_class = MovieDocument

    def generate_q_expression(self, query):
        return Q("multi_match", query=query, fields=["title"], fuzziness="AUTO")
    
    def get(self, request, query):
        q = self.generate_q_expression(query)
        if not q:
            return Response({"error": "query is required"}, status=400)
        
        search = self.document_class.search().query(q)
        response = search.execute()
        hits = response.hits.hits
        for hit in hits:
            hit = hit.to_dict()
            hit["_source"]['id'] = hit["_id"]
            
        serializer = MovieBannerSerializer([hit["_source"] for hit in hits], many=True)
        return Response(serializer.data)
