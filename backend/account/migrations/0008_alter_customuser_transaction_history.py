# Generated by Django 4.2.3 on 2023-07-28 08:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0007_alter_customuser_transaction_history'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='transaction_history',
            field=models.TextField(default='[]'),
        ),
    ]