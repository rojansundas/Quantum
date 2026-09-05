from rest_framework import serializers
from .models import ServiceInquiry


class ServiceInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceInquiry
        fields = ['service', 'name', 'email', 'phone', 'company', 'budget', 'requirements']

    def validate_requirements(self, value):
        if len(value) < 10:
            raise serializers.ValidationError('Please describe your requirements in a bit more detail.')
        return value
