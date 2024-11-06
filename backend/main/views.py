from django.shortcuts import render
from rest_framework import mixins, viewsets, permissions
from django_filters.rest_framework import DjangoFilterBackend
from .filters import ShopFilterset
from rest_framework import filters
from .models import (
    ProductionCompany,
    WateringCan
)
from .serializers import (
    ProductionCompanySerializer,
    WateringCanSerializer
)
# Create your views here.
class ProductionCompanyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ProductionCompany.objects.all()
    serializer_class = ProductionCompanySerializer

class WateringCanViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = WateringCan.objects.all()
    serializer_class = WateringCanSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ShopFilterset
    