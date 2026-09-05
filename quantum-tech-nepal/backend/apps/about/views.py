from rest_framework import generics, permissions
from .models import About
from .serializers import AboutSerializer


class AboutView(generics.RetrieveAPIView):
    """Single object endpoint — GET /api/v1/about/"""
    serializer_class = AboutSerializer
    permission_classes = [permissions.AllowAny]

    def get_object(self):
        return About.load()
