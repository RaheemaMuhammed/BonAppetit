from rest_framework import serializers
from .models import *
from account.models import *
import json

class TransactionHistoryField(serializers.Field):
    def to_representation(self, value):
        return json.loads(value)

    def to_internal_value(self, data):
        return json.dumps(data)

class UserSerializer(serializers.ModelSerializer):
    status=serializers.BooleanField(source='is_block')
    recipes=serializers.PrimaryKeyRelatedField(many=True,read_only=True)
    comments=serializers.PrimaryKeyRelatedField(many=True,read_only=True)
    transaction_history = TransactionHistoryField()
    class Meta:
        model = CustomUser
        fields = ['email', 'phone', 'username', 'has_premium', 'is_block','wallet' ,'premium_expiry', 'id', 'profile_pic', 'is_active','status', 'is_user', 'otp','recipes','comments','transaction_history']



class CategorySerializer(serializers.ModelSerializer):
    status=serializers.BooleanField(source='is_disabled')
    class Meta:
        model = Categories
        fields = ['name','id','is_disabled','status']
    def validate(self, data):
        if data['name']:
            if any(char.isdigit() for char in data):
                raise serializers.ValidationError("Category name cannot contain numbers.")
            return data