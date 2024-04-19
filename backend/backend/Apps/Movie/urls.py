from django.urls import path, include
from . import views

urlpatterns = [
    path("genres/", views.GenreListView.as_view(), name="genres"),
]
