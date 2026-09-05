from rest_framework import serializers
from .models import Job, Application
from utils.helpers import validate_file_upload


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['job', 'full_name', 'email', 'phone', 'cover_letter', 'resume', 'portfolio_url']

    def validate_resume(self, value):
        return validate_file_upload(value)
