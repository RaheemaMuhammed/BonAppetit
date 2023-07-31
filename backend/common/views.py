from django.shortcuts import render
from rest_framework.views import APIView
from recipe.serializers import *
from recipe.models import *
from rest_framework.response import Response
from decimal import Decimal

class RecipeList(APIView):
    # Listing all the recipes
    def get(self,request):
            try:
                recipes=Recipe.objects.all().order_by('-id')
                serializer=RecipeSerializer(recipes,many=True)
                return Response({'payload':serializer.data,'message':'success'})
            except Exception as e:
                return Response({'error':str(e)})
            
  # Get single recipe

class SingleRecipe(APIView):
 
        def get(self,request):
            try:
                recipe_name = request.GET.get('recipe_name')
                recipe = Recipe.objects.get(recipe_name=recipe_name)  
                serializer = RecipeSerializer(recipe)
                return Response({'status':200,'payload':serializer.data})
            except Exception as e:
                return Response({'error':str(e)})
            
class AuthorProfile(APIView):
     def get(self,request):
            pass
# Trending recipes
class Trending(APIView):
     def get(self,request):
            try:
                recipes=Recipe.objects.order_by('-total_likes')[:8]
                serializer=RecipeSerializer(recipes,many=True)
                return Response({'payload':serializer.data,'message':'success'})
            except Exception as e:
                return Response({'error':str(e)})
            
# latest recipes
class Latest(APIView):
     def get(self,request):
            try:
                recipes=Recipe.objects.order_by('-created_at')[:8]
                serializer=RecipeSerializer(recipes,many=True)
                return Response({'payload':serializer.data,'message':'success'})
            except Exception as e:
                return Response({'error':str(e)})
            
class CommentListing(APIView):
  
          def get(self,request):
             try:
                recipe_id = request.GET.get('recipe_id')
                
                recipe=Comment.objects.filter(recipe_id=recipe_id)
                
                serializer=CommentsSerializer(recipe,many=True)
                return Response({'status':200,'payload':serializer.data})

             except Exception as e:
                  return Response({'error':str(e)})
          
          