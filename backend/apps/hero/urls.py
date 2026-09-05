from django.urls import path
from .views import HeroView

urlpatterns = [
    path('', HeroView.as_view(), name='hero'),
]
