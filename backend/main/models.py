from django.db import models
from django.conf import settings

# Create your models here.
class ProductionCompany(models.Model):
    name = models.CharField(max_length=100)

class WateringCan(models.Model):
    name = models.CharField(max_length=100, default="Лейка")
    width = models.IntegerField()
    height = models.IntegerField()
    length = models.IntegerField()
    nose_length = models.IntegerField()
    handle_type = models.CharField(max_length=100)
    image = models.ImageField(upload_to='watering_cans/', null=True, blank=True)
    producer = models.ForeignKey(
        to= ProductionCompany,
        on_delete=models.CASCADE,
        related_name='produced_watering_can'
    )
    owner = models.ForeignKey(
        to=settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='owned_watering_can'
    )