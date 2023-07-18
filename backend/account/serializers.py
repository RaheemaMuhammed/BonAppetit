from rest_framework import serializers
from .models import *


# for signing up

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
            model = CustomUser
            fields=['username','email','phone','password']

    def validate(self, data):
        if data['username']:
            for i in data['username']:
                if i.isdigit():
                    raise serializers.ValidationError({'error':'name cannot contain numbers'})
                
        if data['phone']:
            num=str(data['phone'])
            if len(num)>10 or len(num)<10:
                raise serializers.ValidationError({'error':'invalid phone number'})
        return data
    

    def create(self,validated_data):
        user=CustomUser.objects.create(email=validated_data['email'])
        user.username=validated_data['username']
        user.phone=validated_data['phone']
        user.set_password(validated_data['password'])
        user.save()
        return user 
    

class VerifyEmailSerializer(serializers.Serializer):
    email=serializers.EmailField()
    otp=serializers.CharField()

