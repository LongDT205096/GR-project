from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

from ..Movie.models import Movie
from .models import Rate
from .serializer import RateSerializer


# Create your views here.
class RatePersonal(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        movie = Movie.objects.get(pk=data['movie'])
        serializer = RateSerializer(data=data)
        if serializer.is_valid():
            print(movie.average_rating())
            movie.ave_rate = movie.average_rating()
            serializer.save()
            movie.save()
            return Response({'message': 'Rate created'}, status=201)
        return Response(serializer.errors, status=400)


class RateEdit(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        rate = Rate.objects.get(pk=pk)
        serializer = RateSerializer(rate)
        return Response(serializer.data, status=200)

    def put(self, request, pk):
        rate = Rate.objects.get(pk=pk)
        print(rate)
        movie = Movie.objects.get(pk=request.data['movie'])
        serializer = RateSerializer(rate, data=request.data)
        if serializer.is_valid():
            serializer.save()
            movie.ave_rate = movie.average_rating()
            movie.save()
            return Response({'message': 'Rate updated'}, status=200)
        return Response(serializer.errors, status=400)
