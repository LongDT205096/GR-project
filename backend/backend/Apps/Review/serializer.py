from rest_framework import serializers
from .models import Review
from ..Rate.models import Rate


class ReviewSerializer(serializers.ModelSerializer):
    rate = serializers.SerializerMethodField()

    def get_rate(self, obj):
        try:
            return Rate.objects.get(movie=obj.movie, account=obj.account).rate
        except Rate.DoesNotExist:
            return 0 
    
    class Meta:
        model = Review
        fields = '__all__'


class ReviewUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"
