from rest_framework import serializers
from . models import *
from adminpanel.serializers import CategorySerializer

class RecipeSerializer(serializers.ModelSerializer):
    author_id = serializers.CharField(source='author.id')
    author = serializers.CharField(source='author.username')

    category_name = serializers.CharField(source='category.name')

    category = CategorySerializer()

    class Meta:
        model = Recipe
        fields = ('id','category', 'category_name', 'picture', 'recipe_name', 'instructions','is_private',
                  'ingredients','created_at','updated_at','author_id','author')
        



class PostRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model=Recipe
        fields='__all__'
