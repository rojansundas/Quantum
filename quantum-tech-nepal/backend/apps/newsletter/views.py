from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator
from .models import NewsletterSubscriber
from .serializers import NewsletterSubscriberSerializer


@method_decorator(ratelimit(key='ip', rate='5/h', method='POST', block=True), name='post')
class NewsletterSubscribeView(generics.CreateAPIView):
    queryset = NewsletterSubscriber.objects.all()
    serializer_class = NewsletterSubscriberSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        super().create(request, *args, **kwargs)
        return Response({'detail': 'Subscribed successfully.'}, status=status.HTTP_201_CREATED)
