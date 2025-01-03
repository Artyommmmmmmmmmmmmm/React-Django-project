# Generated by Django 5.1.1 on 2024-09-27 04:10

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ProductionCompany',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='WateringCan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('width', models.CharField(max_length=100)),
                ('heigth', models.CharField(max_length=100)),
                ('length', models.CharField(max_length=100)),
                ('nose_length', models.CharField(max_length=100)),
                ('handle_type', models.CharField(max_length=100)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='owned_watering_can', to=settings.AUTH_USER_MODEL)),
                ('producer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='produced_watering_can', to='main.productioncompany')),
            ],
        ),
    ]
