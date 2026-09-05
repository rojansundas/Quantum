from rest_framework import serializers
from .models import Project, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']

class ProjectSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    class Meta:
        model = Project
        fields = ['id', 'title', 'slug', 'category', 'description', 'thumbnail',
                  'live_url', 'github_url', 'technologies', 'featured', 'created_at']
