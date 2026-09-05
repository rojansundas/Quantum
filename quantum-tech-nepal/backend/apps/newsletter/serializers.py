from rest_framework import serializers
from .models import NewsletterSubscriber


class NewsletterSubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = ('email',)

    def validate_email(self, value):
        existing = NewsletterSubscriber.objects.filter(email__iexact=value).first()
        if existing and existing.is_active:
            raise serializers.ValidationError('This email is already subscribed.')
        return value

    def create(self, validated_data):
        # Re-subscribing after an unsubscribe should just reactivate the row
        # rather than fail the unique constraint.
        obj, _ = NewsletterSubscriber.objects.update_or_create(
            email__iexact=validated_data['email'],
            defaults={'email': validated_data['email'], 'is_active': True},
        )
        return obj
