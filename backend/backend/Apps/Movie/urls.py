from django.urls import path, include
from . import views

urlpatterns = [
    path('<int:pk>/', views.MovieDetailView.as_view(), name='movie-details'),
    path('<int:pk>/images/', views.MovieImageView.as_view(), name='movie-images'),
    path('<int:pk>/videos/', views.MovieVideoView.as_view(), name='movie-videos'),
    path("genres/", views.GenreListView.as_view(), name="genres"),
    path("genre=<int:pk>/", views.MovieByGenreView.as_view(), name="movies-genre"),
]
