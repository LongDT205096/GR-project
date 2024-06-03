from django.urls import path, include
from . import views

urlpatterns = [
    path('<int:pk>/', views.ActorDetailView.as_view()),
    path('<int:pk>/movies/', views.ActorMovieView.as_view()),
    path('<int:pk>/images/', views.ActorImageView.as_view()),
]
