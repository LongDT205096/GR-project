from django.urls import path
from . import views

urlpatterns = [
    path('details/<int:pk>/reviews/', views.ReviewListView.as_view(), name='review-list'),
    path('details/<int:pk>/reviews/new/', views.ReviewPersonal.as_view(), name='review-personal'),
]
