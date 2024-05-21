from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from ..Movie.models import Movie
from .models import Rate
from .serializer import RateSerializer


# Create your views here.
class RateView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        movie = Movie.objects.get(pk=data['movie'])
        serializer = RateSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Rate created'}, status=201)
        return Response(serializer.errors, status=400)

    def put(self, request, pk):
        data = request.data
        rate = Rate.objects.get(pk=pk)
        serializer = RateSerializer(rate, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Rate updated'}, status=200)
        return Response(serializer.errors, status=400)
