import csv
from django.contrib import admin
from django.http import HttpResponse
from .models import NewsletterSubscriber


@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ('email', 'is_active', 'subscribed_at')
    list_filter = ('is_active',)
    list_editable = ('is_active',)
    search_fields = ('email',)
    ordering = ('-subscribed_at',)
    readonly_fields = ('subscribed_at',)
    actions = ('export_as_csv', 'activate', 'deactivate')

    @admin.action(description='Export selected subscribers as CSV')
    def export_as_csv(self, request, queryset):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename=newsletter_subscribers.csv'
        writer = csv.writer(response)
        writer.writerow(['Email', 'Active', 'Subscribed At'])
        for sub in queryset:
            writer.writerow([sub.email, sub.is_active, sub.subscribed_at])
        return response

    @admin.action(description='Mark selected as active')
    def activate(self, request, queryset):
        queryset.update(is_active=True)

    @admin.action(description='Mark selected as inactive (unsubscribed)')
    def deactivate(self, request, queryset):
        queryset.update(is_active=False)
