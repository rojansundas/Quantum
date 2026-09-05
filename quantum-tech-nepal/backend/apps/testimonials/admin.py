from django.contrib import admin
from .models import Testimonial

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'company', 'role', 'rating', 'is_featured', 'order')
    list_filter = ('rating', 'is_featured')
    list_editable = ('is_featured', 'order')
    search_fields = ('name', 'company', 'text')
    ordering = ('order', '-created_at')