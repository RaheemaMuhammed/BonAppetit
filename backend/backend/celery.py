import os

from celery import Celery

from celery.schedules import crontab
# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

app = Celery('backend')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')

app.conf.beat_schedule = {
    'delete-old-notifications': {
        'task': 'user.tasks.delete_old_notifications',
       
         'schedule': crontab(hour=0, minute=0),  # Run daily at midnight
    },
}

# Load task modules from all registered Django apps.
app.autodiscover_tasks()

