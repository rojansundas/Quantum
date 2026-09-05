from django.urls import path
from . import views

urlpatterns = [
    path('', views.JobListView.as_view(), name='jobs'),
    path('<int:pk>/', views.JobDetailView.as_view(), name='job-detail'),
    path('apply/', views.ApplyView.as_view(), name='apply'),
]
