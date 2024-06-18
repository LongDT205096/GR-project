from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Watchlist, Watchlist_Movie
from .serializer import ( 
    WatchlistSerializer,
    AddToWatchlistSerializer
)

# Create your views here.
class WatchlistView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        watchlist = Watchlist.objects.get(account=request.user)
        serializer = WatchlistSerializer(watchlist)
        return Response(serializer.data)
    
    def post(self, request):
        watchlist = Watchlist.objects.get(account=request.user)
        request.data["watchlist"] = watchlist.id       
        serializer = AddToWatchlistSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Movie added to watchlist."})
        return Response(serializer.errors)
    
    def delete(self, request):
        watchlist = Watchlist.objects.get(account=request.user)
        movie = Watchlist_Movie.objects.get(watchlist=watchlist, movie_id=request.data["movie"])
        movie.delete()
        return Response({"message": "Movie removed from watchlist."})
