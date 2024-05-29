from django.urls import path
from . import views

urlpatterns = [
    path('details/<int:pk>/rate/', views.RatePersonal.as_view(), name='rate'),
    # path('edit/<int:pk>/', views.RateEdit.as_view(), name='rate_edit'),
]

