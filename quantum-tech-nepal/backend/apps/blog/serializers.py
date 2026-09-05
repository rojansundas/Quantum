from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Post, Tag, Comment

User = get_user_model()

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name', 'slug']

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'full_name', 'avatar']

class PostListSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    author = AuthorSerializer(read_only=True)
    class Meta:
        model = Post
        fields = ['id', 'title', 'slug', 'author', 'cover_image', 'excerpt',
                  'tags', 'views', 'published_at']

class PostDetailSerializer(PostListSerializer):
    class Meta(PostListSerializer.Meta):
        fields = PostListSerializer.Meta.fields + ['content', 'meta_title', 'meta_description']

class CommentSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()
    def get_author_name(self, obj):
        return obj.author.full_name if obj.author else 'Anonymous'
    class Meta:
        model = Comment
        fields = ['id', 'author_name', 'body', 'created_at']
