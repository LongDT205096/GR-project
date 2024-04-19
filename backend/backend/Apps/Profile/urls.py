from django.urls import path, include
from . import views

urlpatterns = [
    path("view/", views.ProfileView.as_view(), name="profile"),
    path("update/", views.ProfileUpdateView.as_view(), name="update_profile"),
]
