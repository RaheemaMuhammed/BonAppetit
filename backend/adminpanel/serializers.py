from rest_framework import serializers
from .models import *
from account.models import *


class UserSerializer(serializers.ModelSerializer):
    status=serializers.BooleanField(source='is_block')
    recipes=serializers.PrimaryKeyRelatedField(many=True,read_only=True)
    comments=serializers.PrimaryKeyRelatedField(many=True,read_only=True)
    class Meta:
        model = CustomUser
        fields = ['email', 'phone', 'username', 'has_premium', 'is_block', 'premium_expiry', 'id', 'profile_pic', 'is_active','status', 'is_user', 'otp','recipes','comments']



class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = ['name','id']
    def validate(self, data):
        if data['name']:
            if any(char.isdigit() for char in data):
                raise serializers.ValidationError("Category name cannot contain numbers.")
            return data