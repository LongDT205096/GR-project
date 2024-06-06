from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from .serializer import ReviewSerializer
from .models import Review
from ..Rate.models import Rate


# Create your views here.
class ReviewListView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, pk):
        reviews = Review.objects.all().filter(movie=pk)
        serializer = ReviewSerializer(reviews, many=True)
        all_rate = Rate.objects.filter(movie=pk)
        rate_count = all_rate.count()
        rate_1 = all_rate.filter(rate=1).count()
        rate_2 = all_rate.filter(rate=2).count()
        rate_3 = all_rate.filter(rate=3).count()
        rate_4 = all_rate.filter(rate=4).count()
        rate_5 = all_rate.filter(rate=5).count()

        return Response({
            'reviews': serializer.data,
            'chart': {
                'all': rate_count,
                'rate_num' :{
                    'rate_1': rate_1,
                    'rate_2': rate_2,
                    'rate_3': rate_3,
                    'rate_4': rate_4,
                    'rate_5': rate_5
                }
            }
        })


class ReviewPersonal(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        reviews = Review.objects.filter(account=request.user)
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

    def post(self, request, pk):
        request.data['movie'] = pk
        request.data['account'] = request.user.id
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
