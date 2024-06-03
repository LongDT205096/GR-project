from django.urls import path
from . import views

urlpatterns = [
    path('<int:pk>/reviews/', views.ReviewListView.as_view(), name='review-list'),
    path('<int:pk>/reviews/new/', views.ReviewPersonal.as_view(), name='review-personal'),
]
