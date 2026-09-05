from django.db import models
from apps.services.models import Service


class ServiceInquiry(models.Model):
    class Status(models.TextChoices):
        NEW = 'new', 'New'
        CONTACTED = 'contacted', 'Contacted'
        QUOTED = 'quoted', 'Quoted'
        WON = 'won', 'Won'
        LOST = 'lost', 'Lost'

    service = models.ForeignKey(
        Service, on_delete=models.SET_NULL, null=True, blank=True, related_name='inquiries'
    )
    name = models.CharField(max_length=128)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    company = models.CharField(max_length=128, blank=True)
    budget = models.CharField(max_length=100, blank=True)
    requirements = models.TextField()
    status = models.CharField(max_length=16, choices=Status.choices, default=Status.NEW)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Service Inquiry'
        verbose_name_plural = 'Service Inquiries'
        indexes = [models.Index(fields=['status'])]

    def __str__(self):
        return f'{self.name} — {self.service}'
