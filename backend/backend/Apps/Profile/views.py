from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response

from .models import Profile
from .serializer import ProfileSerializer
from ..Account.models import Account
# Create your views here.
class ProfileView(APIView):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        profile = Profile.objects.get(account=request.user)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)
