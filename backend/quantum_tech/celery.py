import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'quantum_tech.settings')
app = Celery('quantum_tech')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()
