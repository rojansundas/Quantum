from django.urls import path
from . import views

urlpatterns = [
    path('', views.ServiceInquiryCreateView.as_view(), name='service-inquiry'),
]
