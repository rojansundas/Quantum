from django.db import models
from utils.models import SingletonModel


class SiteSettings(SingletonModel):
    # Branding
    company_name = models.CharField(max_length=150, default='Quantum Tech Nepal')
    logo = models.ImageField(upload_to='site/', null=True, blank=True)
    dark_logo = models.ImageField(upload_to='site/', null=True, blank=True)
    favicon = models.ImageField(upload_to='site/', null=True, blank=True)

    # Contact
    phone = models.CharField(max_length=30, blank=True)
    email = models.EmailField(blank=True)
    address = models.CharField(max_length=255, blank=True)
    google_map_embed = models.TextField(blank=True, help_text='Google Maps embed URL or iframe src')

    # Social
    facebook = models.URLField(blank=True)
    instagram = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    tiktok = models.URLField(blank=True)
    youtube = models.URLField(blank=True)
    whatsapp = models.CharField(max_length=30, blank=True, help_text='Phone number or wa.me link')

    # Misc
    opening_hours = models.CharField(max_length=255, blank=True, help_text='e.g. Sun–Fri: 9:00 AM – 6:00 PM')
    footer_text = models.CharField(max_length=255, blank=True)

    # SEO
    meta_title = models.CharField(max_length=200, blank=True)
    meta_description = models.CharField(max_length=400, blank=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Site Settings'
        verbose_name_plural = 'Site Settings'

    def __str__(self):
        return self.company_name
