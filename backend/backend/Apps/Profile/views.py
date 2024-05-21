from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from rest_framework import status

from .models import Profile
from .serializer import ProfileSerializer


# Create your views here.
class ProfileView(APIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        profile = Profile.objects.get(account=request.user)
        serializer = ProfileSerializer(profile)
        serializer.data['account'] = serializer.get_account(profile)

        return Response(serializer.data)


class ProfileUpdateView(APIView):
    def get(self, request):
        profile = Profile.objects.get(account=request.user)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    def put(self, request):
        profile = Profile.objects.get(account=request.user)
        serializer = ProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

