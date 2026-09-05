from django.contrib import admin
from django.shortcuts import redirect
from utils.admin_mixins import ImagePreviewMixin, SingletonAdminMixin
from .models import Hero, HeroStat


class HeroStatInline(admin.TabularInline):
    model = HeroStat
    extra = 1
    fields = ('label', 'value', 'order', 'is_active')
    ordering = ('order',)


@admin.register(Hero)
class HeroAdmin(SingletonAdminMixin, ImagePreviewMixin, admin.ModelAdmin):
    image_preview_fields = ('background_image',)
    inlines = [HeroStatInline]
    fieldsets = (
        ('Content', {'fields': ('heading', 'subheading', 'animated_words')}),
        ('Background', {'fields': ('background_image', 'background_image_preview')}),
        ('Call To Action', {'fields': ('button_text', 'button_link')}),
        ('Timestamps', {'fields': ('updated_at',)}),
    )
    readonly_fields = ('updated_at', 'background_image_preview')
    list_display = ('heading', 'button_text', 'updated_at')

    def changelist_view(self, request, extra_context=None):
        obj = Hero.load()
        return redirect('admin:hero_hero_change', obj.pk)


@admin.register(HeroStat)
class HeroStatAdmin(admin.ModelAdmin):
    list_display = ('label', 'value', 'order', 'is_active')
    list_editable = ('order', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('label',)
    ordering = ('order',)
