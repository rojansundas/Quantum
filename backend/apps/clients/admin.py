from django.contrib import admin
from utils.admin_mixins import ImagePreviewMixin
from .models import Client


@admin.register(Client)
class ClientAdmin(ImagePreviewMixin, admin.ModelAdmin):
    image_preview_fields = ('logo',)
    list_display = ('logo_preview', 'name', 'website', 'order', 'is_active')
    list_display_links = ('name',)
    list_editable = ('order', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('name',)
    ordering = ('order', 'name')
    readonly_fields = ('created_at', 'logo_preview')
    actions = ('activate', 'deactivate')

    @admin.action(description='Mark selected clients as active')
    def activate(self, request, queryset):
        queryset.update(is_active=True)

    @admin.action(description='Mark selected clients as inactive')
    def deactivate(self, request, queryset):
        queryset.update(is_active=False)
