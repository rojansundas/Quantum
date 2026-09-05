from django.contrib import admin
from utils.admin_mixins import ImagePreviewMixin, SingletonAdminMixin
from .models import SiteSettings


@admin.register(SiteSettings)
class SiteSettingsAdmin(SingletonAdminMixin, ImagePreviewMixin, admin.ModelAdmin):
    image_preview_fields = ('logo', 'dark_logo', 'favicon')

    fieldsets = (
        ('Branding', {'fields': ('company_name', 'logo', 'logo_preview', 'dark_logo', 'dark_logo_preview', 'favicon', 'favicon_preview')}),
        ('Contact', {'fields': ('phone', 'email', 'address', 'google_map_embed')}),
        ('Social', {'fields': ('facebook', 'instagram', 'linkedin', 'tiktok', 'youtube', 'whatsapp')}),
        ('Misc', {'fields': ('opening_hours', 'footer_text')}),
        ('SEO', {'fields': ('meta_title', 'meta_description')}),
        ('Timestamps', {'fields': ('updated_at',)}),
    )
    readonly_fields = ('updated_at', 'logo_preview', 'dark_logo_preview', 'favicon_preview')
    list_display = ('company_name', 'email', 'phone', 'updated_at')

    def changelist_view(self, request, extra_context=None):
        # Singleton: skip the list page and go straight to the (only) change form.
        obj = SiteSettings.load()
        from django.shortcuts import redirect
        return redirect('admin:sitesettings_sitesettings_change', obj.pk)
