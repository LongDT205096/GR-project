from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.RatePersonal.as_view(), name='rate'),
    path('edit/<int:pk>/', views.RateEdit.as_view(), name='rate_edit'),
]

