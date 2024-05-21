from django.urls import path
from . import views

urlpatterns = [
    path('<int: pk>/', views.ReviewList.as_view(), name='review-list'),
    path('own/', views.ReviewDetail.as_view(), name='review-detail'),
]