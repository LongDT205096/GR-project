from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from .models import Actor, ActorImage
from .serializer import ( 
    ActorSerializer,
    ActorImageSerializer,
    ActorMovieSerializer
)
from ..Movie.models import Movie_Actor
# Create your views here.

class ActorDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        actor = Actor.objects.get(pk=pk)
        serializer = ActorSerializer(actor)

        return Response(serializer.data)
    

class ActorMovieView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        actor = Actor.objects.get(pk=pk)
        movie_list = Movie_Actor.objects.filter(actor=actor)
        movies = [movie.movie for movie in movie_list]
        serializer = ActorMovieSerializer(movies, many=True)

        return Response(serializer.data)


class ActorImageView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        actor = Actor.objects.get(pk=pk)
        images = ActorImage.objects.filter(actor=actor)
        serializer = ActorImageSerializer(images, many=True)

        return Response(serializer.data)
