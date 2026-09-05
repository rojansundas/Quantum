from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator
from .models import ServiceInquiry
from .serializers import ServiceInquirySerializer
from utils.helpers import get_client_ip


@method_decorator(ratelimit(key='ip', rate='5/h', method='POST', block=True), name='post')
class ServiceInquiryCreateView(generics.CreateAPIView):
    queryset = ServiceInquiry.objects.all()
    serializer_class = ServiceInquirySerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        serializer.save(ip_address=get_client_ip(self.request))

    def create(self, request, *args, **kwargs):
        super().create(request, *args, **kwargs)
        return Response({'detail': 'Inquiry submitted successfully.'}, status=status.HTTP_201_CREATED)
