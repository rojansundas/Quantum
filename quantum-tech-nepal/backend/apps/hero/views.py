from rest_framework import generics, permissions
from .models import Hero
from .serializers import HeroSerializer


class HeroView(generics.RetrieveAPIView):
    """Single object endpoint — GET /api/v1/hero/"""
    serializer_class = HeroSerializer
    permission_classes = [permissions.AllowAny]

    def get_object(self):
        return Hero.load()
