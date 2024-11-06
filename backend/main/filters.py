from django_filters import rest_framework as filters
from .models import WateringCan

class ShopFilterset(filters.FilterSet):
    min_width = filters.NumberFilter(field_name="width", lookup_expr='gte')
    max_width = filters.NumberFilter(field_name="width", lookup_expr='lte')

    min_height = filters.NumberFilter(field_name="height", lookup_expr='gte')
    max_height = filters.NumberFilter(field_name="height", lookup_expr='lte')

    min_length = filters.NumberFilter(field_name="length", lookup_expr='gte')
    max_length = filters.NumberFilter(field_name="length", lookup_expr='lte')

    min_nose_length = filters.NumberFilter(field_name="nose_length", lookup_expr='gte')
    max_nose_length = filters.NumberFilter(field_name="nose_length", lookup_expr='lte')

    class Meta:
        model = WateringCan
        fields = [] 
