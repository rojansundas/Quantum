from django.contrib import admin
from django.shortcuts import redirect
from utils.admin_mixins import ImagePreviewMixin, SingletonAdminMixin
from .models import About, AboutImage, TimelineItem, Achievement


class AboutImageInline(admin.TabularInline):
    model = AboutImage
    extra = 1
    fields = ('image', 'caption', 'order')
    ordering = ('order',)


class TimelineItemInline(admin.TabularInline):
    model = TimelineItem
    extra = 1
    fields = ('year', 'title', 'description', 'order')
    ordering = ('order',)


class AchievementInline(admin.TabularInline):
    model = Achievement
    extra = 1
    fields = ('title', 'value', 'icon', 'order')
    ordering = ('order',)


@admin.register(About)
class AboutAdmin(SingletonAdminMixin, ImagePreviewMixin, admin.ModelAdmin):
    image_preview_fields = ('ceo_photo', 'cover_image')
    inlines = [TimelineItemInline, AchievementInline, AboutImageInline]
    fieldsets = (
        ('Mission & Vision', {'fields': ('mission', 'vision')}),
        ('Story', {'fields': ('story', 'cover_image', 'cover_image_preview')}),
        ('CEO Message', {'fields': ('ceo_name', 'ceo_message', 'ceo_photo', 'ceo_photo_preview')}),
        ('Timestamps', {'fields': ('updated_at',)}),
    )
    readonly_fields = ('updated_at', 'ceo_photo_preview', 'cover_image_preview')
    list_display = ('__str__', 'ceo_name', 'updated_at')

    def changelist_view(self, request, extra_context=None):
        obj = About.load()
        return redirect('admin:about_about_change', obj.pk)


@admin.register(TimelineItem)
class TimelineItemAdmin(admin.ModelAdmin):
    list_display = ('year', 'title', 'order')
    list_editable = ('order',)
    search_fields = ('title', 'year')
    ordering = ('order',)


@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ('title', 'value', 'icon', 'order')
    list_editable = ('order',)
    search_fields = ('title',)
    ordering = ('order',)
