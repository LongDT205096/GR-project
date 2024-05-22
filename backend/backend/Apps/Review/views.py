from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from .serializer import ReviewSerializer
from .models import Review


# Create your views here.
class ReviewListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        reviews = Review.objects.all().filter(movie=pk)
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)


class ReviewPersonal(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        reviews = Review.objects.all().filter(account=request.user)
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)

    def put(self, request):
        user_review = Review.objects.filter(account=request.user, movie=request.data['movie'])
        serializer = ReviewSerializer(user_review, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReviewCreate(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    
    def post(self, request):
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
