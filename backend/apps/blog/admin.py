from django.contrib import admin
from .models import Tag, Post, Comment

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'status', 'views', 'published_at', 'created_at')
    list_filter = ('status', 'tags')
    list_editable = ('status',)
    search_fields = ('title', 'excerpt', 'content')
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ('tags',)
    readonly_fields = ('views', 'created_at', 'updated_at')
    fieldsets = (
        (None, {'fields': ('title', 'slug', 'author', 'status', 'cover_image')}),
        ('Content', {'fields': ('excerpt', 'content', 'tags')}),
        ('SEO', {'fields': ('meta_title', 'meta_description')}),
        ('Stats', {'fields': ('views', 'published_at', 'created_at', 'updated_at')}),
    )

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('author', 'post', 'approved', 'created_at')
    list_filter = ('approved',)
    list_editable = ('approved',)
    search_fields = ('author__email', 'body')
    actions = ['approve_comments']

    def approve_comments(self, request, queryset):
        queryset.update(approved=True)
    approve_comments.short_description = 'Approve selected comments'