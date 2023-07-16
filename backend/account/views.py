from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import * 
from django.contrib.auth import authenticate, login
from  rest_framework_simplejwt.authentication import JWTAuthentication
# Create your views here
from rest_framework_simplejwt.tokens import RefreshToken
from .emails import send_otp_via_email

# to handle registration


class Register(APIView):
    def post(self,request):
        try:
            data=request.data
            serializer=RegisterSerializer(data=data)

            if serializer.is_valid():
                serializer.save()
                send_otp_via_email(data['email'])
                return Response({'status':200,
                                 'message':'Successfully Registered.Please Check your email',
                                 'data':serializer.data})
            return Response({'status':400,
                             'message':'something went wrong',
                             'data':serializer.errors
                             })

        except Exception as e:
            return Response(
                {
                    'status': 500,
                    'message': 'An error occurred during registration.',
                    'data': str(e)
                })

class VerifyOTP(APIView):
    def post(self,request):
        try:
            data=request.data
            serializer=VerifyEmailSerializer(data=data)

            if serializer.is_valid():
                email=serializer.data['email']
                otp=serializer.data['otp']
                user=CustomUser.objects.filter(email=email)
                if not user.exists():
                    return Response({'status':400,
                                    'message':'something went wrong',
                                    'data':'Invalid email'
                                    })
                if user[0].otp != otp:
                    return Response({'status':400,
                                    'message':'something went wrong',
                                    'data':'Wrong OTP'
                                    })
                user=user.first()
                user.is_active=True
                user.save()
                return Response({'status':200,
                                 'message':'Email Verification Done',
                                 'data':''})
            

        except Exception as e:
            return Response(
                {
                    'status': 500,
                    'message': 'An error occurred during Email Verified.',
                    'error': str(e)
                })

class Login(APIView):
    def post(self,request):
       
        try:
            data=request.data
            serializer=LoginSerializer(data=data)
            if serializer.is_valid():

                email=serializer.data['email']
                password=serializer.data['password']
                user=authenticate(email=email,password=password)
                print('userrrrrrrrr',user)
                if user is not None:
                    if user.is_active == True and user.is_block == False:
                        username=user.username
                        login(request,user)
                        refresh=RefreshToken.for_user(user=user.id)
                        return Response({'message':'you are successfully logged in',
                                        'status':200,
                                        'refresh':str(refresh),
                                        'access':str(refresh.access_token),
                                        'username':username

                        })
                    elif user.is_block == True:
                        return Response({
                            'status':700,
                            'message':'you are blocked'
                        })
                    else:
                        return Response({
                            'status':800,
                            'message':'something happened'
                        })
                    
                else:
                    return Response({
                        'status':404,
                        'message':'invalid email or password'
                    })
        except Exception as e:
            return Response({'error':e})