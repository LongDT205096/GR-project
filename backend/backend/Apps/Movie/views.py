from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from .models import Genre
from .serializer import GenreSerializer


class MovieView(APIView):
    pass

class GenreListView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        genres = Genre.objects.all()
        serializer = GenreSerializer(genres, many=True)
        return Response(serializer.data)