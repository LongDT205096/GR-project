from django.urls import path, include
from . import views

urlpatterns = [
    path('details/<int:pk>/', views.MovieDetailView.as_view(), name='movie-details'),
    path("genres/", views.GenreListView.as_view(), name="genres"),
    path("genre=<int:pk>/", views.MovieByGenreView.as_view(), name="movies-genre"),
    
]
