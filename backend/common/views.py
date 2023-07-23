from django.shortcuts import render
from rest_framework.views import APIView
from recipe.serializers import *
from recipe.models import *
from rest_framework.response import Response


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



class GetLikes(APIView):
     def get(self,request):
          pass