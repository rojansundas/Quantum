from rest_framework import serializers
from .models import About, AboutImage, TimelineItem, Achievement


class AboutImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutImage
        fields = ('id', 'image', 'caption', 'order')


class TimelineItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimelineItem
        fields = ('id', 'year', 'title', 'description', 'order')


class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = ('id', 'title', 'value', 'icon', 'order')


class AboutSerializer(serializers.ModelSerializer):
    gallery = AboutImageSerializer(many=True, read_only=True)
    timeline = TimelineItemSerializer(many=True, read_only=True)
    achievements = AchievementSerializer(many=True, read_only=True)

    class Meta:
        model = About
        fields = (
            'id', 'mission', 'vision', 'story',
            'ceo_message', 'ceo_name', 'ceo_photo', 'cover_image',
            'gallery', 'timeline', 'achievements',
        )
