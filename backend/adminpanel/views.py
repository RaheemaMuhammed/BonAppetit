from django.shortcuts import render
from .serializers import *
from account.models import CustomUser
from rest_framework.views import APIView
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.response import Response
from rest_framework import generics
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAdminUser,IsAuthenticated
from .models import Categories
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
        
    # for blocking and unblocking

    def patch(self,request):
        data=request.data
        try:
       
            user=CustomUser.objects.get(id=data['id'])
            username=user.username
            if data['status'] == True:
                user.is_block=False
                user.save()
                return Response({'message':f'{username} is Unblocked'})
            if data['status'] == False:
                user.is_block = True
                user.save()
                return Response({'message':f'{username} is Blocked'})
            
        except Exception as e:
            return Response({'error':e})


class CategoryList(APIView):
       # verifies authenticated using jwt
    authentication_classes = [JWTAuthentication]
    # verifies user is adminuser
    permission_classes = [IsAdminUser] 


    # getting category list
    def get(self,request):
            try:
                categories=Categories.objects.all().order_by('-id')
                serializer=CategorySerializer(categories,many=True)
                return Response({'payload':serializer.data,'message':'success'})
            except Exception as e:
                return Response({'error':e})
                  
    def post(self,request):
        try:

            data=request.data
            print(data)
            serializer=CategorySerializer(data=request.data)
            print(serializer)
            if serializer.is_valid():
                serializer.save()
                return Response({'status':200,
                                    'message':'Category added successfully',
                                    'data':serializer.data})
            return Response({'status':400,
                                'message':'Category already exists',
                                'error':serializer.errors})
        except Exception as e:
            return Response({'error':e})

    def delete(self,request):
        id = request.GET.get('id')
        try:
            category=Categories.objects.get(id=id)
            category.delete()
            return Response({'status':200,
                                    'message':'Category deleted successfully',

            })
        except Exception as e:
            return({'error':e})
    