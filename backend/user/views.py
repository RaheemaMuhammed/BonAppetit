from django.shortcuts import render
from django.shortcuts import render
from recipe.serializers import *
from rest_framework.views import APIView
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.response import Response
from rest_framework import generics
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAdminUser,IsAuthenticated
from recipe.models import *
from adminpanel.models import Categories
from adminpanel.serializers import CategorySerializer
# Create your views here.

class RecipeList(APIView):
     # verifies authenticated using jwt
    authentication_classes = [JWTAuthentication]
    # verifies user is adminuser
    permission_classes = [IsAuthenticated] 


    # Adding Recipes 
    def post(self,request):
        try:
            data=request.data
            recipe_name = request.data['recipe_name']
            data=data.copy()
           
            
            author=CustomUser.objects.get(username=data['author'])
            data['author']=author.id
            serializer = PostRecipeSerializer(data=data)
            if not serializer.is_valid():
                return Response({'status':300,'error':serializer.errors,'message':'something went wrong'})
            serializer.save()
            return Response({'status':200,'message':f'Recipe {recipe_name} is added successfully'})
        except Exception as e:
            return Response({'error':str(e)})

    # Listing all the recipes
    def get(self,request):
            try:
                recipes=Recipe.objects.filter(is_private=False).order_by('-id')
                serializer=RecipeSerializer(recipes,many=True)
                return Response({'payload':serializer.data,'message':'success'})
            except Exception as e:
                return Response({'error':str(e)})
            
    # editing recipe

    def patch(self,request):
         data=request.data
         try:
                recipe=Recipe.objects.get(id=data['id'])
                print(recipe)
                serializer=PostRecipeSerializer(instance=recipe,data=data,partial=True)
                if not serializer.is_valid():
                    return Response({'status':300,'error':serializer.errors,'message':'somthing for serializer'})   
                serializer.save()
                return Response({'status':200,'message': f'{recipe} updated successfully'})

         except Exception as e:
              return Response({'error':str(e)})
         

    # deleting a recipe
    def delete(self,request):
            print('sjdskjd')
            try:
                 id=request.GET.get('id')
                 print(id)
                 recipe=Recipe.objects.get(id=id)
                 recipe.delete()
                 return Response({'status':200,'message':f'Tutorial {recipe} deleted successfully'})
            except Exception as e:
                 return Response({'error':str(e)})

    # Get single recipe

class SingleRecipe(APIView):
        authentication_classes = [JWTAuthentication]
        permission_classes = [IsAuthenticated]
        def get(self,request):
            try:
                recipe_name = request.GET.get('recipe_name')
                recipe = Recipe.objects.get(recipe_name=recipe_name)
                serializer = RecipeSerializer(recipe)
                return Response({'status':200,'payload':serializer.data})
            except Exception as e:
                return Response({'error':str(e)})

class CategoryListing(APIView):
        authentication_classes = [JWTAuthentication]
        permission_classes = [IsAuthenticated]
        def get(self,request):
            try:
                categories=Categories.objects.all().order_by('-id')
                serializer=CategorySerializer(categories,many=True)
                return Response({'payload':serializer.data,'message':'success'})
            except Exception as e:
                return Response({'error':str(e)})