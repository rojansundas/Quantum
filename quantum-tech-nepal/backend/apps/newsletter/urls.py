from django.urls import path
from . import views

urlpatterns = [
    path('', views.NewsletterSubscribeView.as_view(), name='newsletter-subscribe'),
]
