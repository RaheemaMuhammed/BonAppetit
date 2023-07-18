from rest_framework import serializers
from .models import *
from account.models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'phone', 'username', 'has_premium', 'is_block', 'premium_expiry', 'wallet', 'profile_pic', 'is_active', 'is_user', 'otp']



class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = '__all__'

    def validate(self, value):
        if any(char.isdigit() for char in value):
            raise serializers.ValidationError("Category name cannot contain numbers.")
        return value