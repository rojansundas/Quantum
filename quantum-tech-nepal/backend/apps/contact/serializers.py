from rest_framework import serializers
from .models import ContactMessage


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'phone', 'service', 'message']

    def validate_message(self, value):
        if len(value) < 20:
            raise serializers.ValidationError('Message must be at least 20 characters.')
        return value
