from rest_framework import serializers
from .models import Hero, HeroStat


class HeroStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroStat
        fields = ('id', 'label', 'value', 'order')


class HeroSerializer(serializers.ModelSerializer):
    statistics = serializers.SerializerMethodField()

    class Meta:
        model = Hero
        fields = (
            'id', 'heading', 'subheading', 'background_image',
            'button_text', 'button_link', 'animated_words', 'statistics',
        )

    def get_statistics(self, obj):
        return HeroStatSerializer(obj.statistics.filter(is_active=True), many=True).data
