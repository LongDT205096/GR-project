from django.urls import path, include
from . import views

urlpatterns = [
    path('auth/', include('djoser.urls')),
    # register: users/
    # activate: users/activation/
    # change: users/set_password/
    # reset: users/reset_password/
    # reset confirm: users/reset_password_confirm/
    path('auth/', include('djoser.social.urls')),
    path('auth/', include('djoser.urls.jwt')),
    # login: jwt/create/
    # refresh: jwt/refresh/
    # verify: jwt/verify/
]
