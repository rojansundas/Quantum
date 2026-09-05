from django.contrib import admin
from utils.admin_mixins import ImagePreviewMixin
from .models import TeamMember


@admin.register(TeamMember)
class TeamMemberAdmin(ImagePreviewMixin, admin.ModelAdmin):
    image_preview_fields = ('photo',)
    list_display = ('photo_preview', 'name', 'position', 'order', 'is_active', 'updated_at')
    list_display_links = ('name',)
    list_editable = ('order', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('name', 'position', 'bio')
    ordering = ('order', 'name')
    readonly_fields = ('created_at', 'updated_at', 'photo_preview')
    fieldsets = (
        (None, {'fields': ('name', 'position', 'photo', 'photo_preview', 'bio')}),
        ('Social Links', {'fields': ('facebook', 'linkedin', 'instagram', 'github')}),
        ('Display', {'fields': ('order', 'is_active')}),
        ('Timestamps', {'fields': ('created_at', 'updated_at')}),
    )
    actions = ('activate', 'deactivate')

    @admin.action(description='Mark selected members as active')
    def activate(self, request, queryset):
        queryset.update(is_active=True)

    @admin.action(description='Mark selected members as inactive')
    def deactivate(self, request, queryset):
        queryset.update(is_active=False)
