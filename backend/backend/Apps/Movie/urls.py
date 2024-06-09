from django.urls import path
from . import views

urlpatterns = [
    path('<int:pk>/', views.MovieDetailView.as_view(), name='movie-details'),
    path('<int:pk>/images/', views.MovieImageView.as_view(), name='movie-images'),
    path('<int:pk>/videos/', views.MovieVideoView.as_view(), name='movie-videos'),
    path('<int:pk>/actors/', views.MovieActorView.as_view(), name='movie-actors'),
    path('trending/', views.TrendingMoviesView.as_view(), name='trending-movies'),
    path('latest/', views.LatestMoviesView.as_view(), name='latest-movies'),
    path("genres/", views.GenreListView.as_view(), name="genres"),
    path("genre=<int:pk>/", views.MovieByGenreView.as_view(), name="movies-genre"),
]
