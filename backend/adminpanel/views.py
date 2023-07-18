from django.shortcuts import render
from .serializers import *
from account.models import CustomUser
from rest_framework.views import APIView
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.response import Response
from rest_framework import generics
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAdminUser,IsAuthenticated

# Create your views here.


# Listing all the users

class UserList(APIView):

    # verifies authenticated using jwt
    authentication_classes = [JWTAuthentication]
    # verifies user is adminuser
    permission_classes = [IsAdminUser] 


    # getting user list
    def get(self,request):
        try:
            users=CustomUser.objects.filter(is_user=True).order_by('-id')
            serializer=UserSerializer(users,many=True)
            return Response({'payload':serializer.data,'message':'success' })
        except Exception as e:
            return Response({'error':e})
        


class CategoryList(APIView):
    pass