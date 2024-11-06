from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    ProductionCompany,
    WateringCan
    )

class ProductionCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductionCompany
        fields = ['id', 'name'] 

class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']

class WateringCanSerializer(serializers.ModelSerializer):
    owner = OwnerSerializer()
    producer = ProductionCompanySerializer()
    image = serializers.ImageField()
    class Meta:
        model = WateringCan
        fields = ['id', 'name', 
                  'width', 'height',
                  'length', 'nose_length',
                  'handle_type', 'producer',
                  'owner', 'image'
                  ]