from django.urls import path
from . import views

urlpatterns = [
    path('<int:pk>/', views.ReviewListView.as_view(), name='review-list'),
    path('own/', views.ReviewPersonal.as_view(), name='review-detail'),
    path('create/', views.ReviewCreate.as_view(), name='review-create'),
]
