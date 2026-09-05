import magic
import os
from django.conf import settings
from rest_framework.exceptions import ValidationError


def get_client_ip(request):
    xff = request.META.get('HTTP_X_FORWARDED_FOR')
    return xff.split(',')[0].strip() if xff else request.META.get('REMOTE_ADDR')


def validate_file_upload(file):
    """Validates uploaded file for type and size."""
    max_size = settings.FILE_UPLOAD_MAX_MEMORY_SIZE
    if file.size > max_size:
        raise ValidationError(f'File too large. Maximum size is {max_size // (1024*1024)} MB.')

    ext = os.path.splitext(file.name)[1].lower()
    if ext not in settings.ALLOWED_UPLOAD_EXTENSIONS:
        raise ValidationError(f'File type not allowed. Allowed: {", ".join(settings.ALLOWED_UPLOAD_EXTENSIONS)}')

    # MIME type check
    mime = magic.from_buffer(file.read(2048), mime=True)
    file.seek(0)
    allowed_mimes = {
        'application/pdf', 'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/png', 'image/jpeg', 'image/gif', 'image/webp',
    }
    if mime not in allowed_mimes:
        raise ValidationError('File content does not match its extension.')
    return file
