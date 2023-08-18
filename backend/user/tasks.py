from celery import shared_task
from datetime import timedelta
from django.utils import timezone

from recipe.models import Notifications


@shared_task
def delete_old_notifications():
    threshold_date = timezone.now() - timedelta(days=2)
    Notifications.objects.filter(timestamp__lt=threshold_date).delete()
    return "Old notifications deleted"


