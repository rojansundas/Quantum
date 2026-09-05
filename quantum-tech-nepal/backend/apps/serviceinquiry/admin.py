from django.contrib import admin
from .models import ServiceInquiry


@admin.register(ServiceInquiry)
class ServiceInquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'service', 'budget', 'status', 'created_at')
    list_filter = ('status', 'service')
    list_editable = ('status',)
    search_fields = ('name', 'email', 'company', 'requirements')
    ordering = ('-created_at',)
    autocomplete_fields = ('service',)
    readonly_fields = (
        'service', 'name', 'email', 'phone', 'company',
        'budget', 'requirements', 'ip_address', 'created_at',
    )
