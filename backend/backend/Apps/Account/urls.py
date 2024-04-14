from django.urls import path, include
from . import views

urlpatterns = [
    path('', include('djoser.urls')),
    # register: users/
    # activate: users/activation/
    # change: users/set_password/
    # reset: users/reset_password/
    # reset confirm: users/reset_password_confirm/

    path('', include('djoser.urls.jwt')),
    # login: users/jwt/create/
    # refresh: users/jwt/refresh/
    # verify: users/jwt/verify/
]
