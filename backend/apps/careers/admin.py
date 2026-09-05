from django.contrib import admin
from .models import Job, Application

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ('title', 'department', 'location', 'job_type', 'is_active', 'deadline', 'created_at')
    list_filter = ('job_type', 'is_active', 'department')
    list_editable = ('is_active',)
    search_fields = ('title', 'department', 'description')
    ordering = ('-created_at',)

@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'phone', 'job', 'created_at')
    list_filter = ('job',)
    search_fields = ('full_name', 'email', 'job__title')
    readonly_fields = ('full_name', 'email', 'phone', 'cover_letter', 'resume', 'portfolio_url', 'job', 'created_at')
    ordering = ('-created_at',)