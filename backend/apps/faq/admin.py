from django.contrib import admin
from .models import FAQ


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ('question', 'order', 'is_active', 'updated_at')
    list_editable = ('order', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('question', 'answer')
    ordering = ('order',)
    readonly_fields = ('created_at', 'updated_at')
    actions = ('activate', 'deactivate')

    @admin.action(description='Mark selected FAQs as active')
    def activate(self, request, queryset):
        queryset.update(is_active=True)

    @admin.action(description='Mark selected FAQs as inactive')
    def deactivate(self, request, queryset):
        queryset.update(is_active=False)
