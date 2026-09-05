from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator
from django.core.mail import send_mail
from django.conf import settings
from .models import ContactMessage
from .serializers import ContactMessageSerializer
from utils.helpers import get_client_ip


@method_decorator(ratelimit(key='ip', rate='5/h', method='POST', block=True), name='post')
class ContactCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        ip = get_client_ip(self.request)
        msg = serializer.save(ip_address=ip)
        send_mail(
            subject=f'New Contact: {msg.name}',
            message=f'From: {msg.name} <{msg.email}>\nService: {msg.service}\n\n{msg.message}',
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.EMAIL_HOST_USER],
            fail_silently=True,
        )

    def create(self, request, *args, **kwargs):
        super().create(request, *args, **kwargs)
        return Response({'detail': 'Message sent successfully.'}, status=status.HTTP_201_CREATED)
