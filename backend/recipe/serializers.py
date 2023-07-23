from rest_framework import serializers
from . models import *
from adminpanel.serializers import CategorySerializer

class RecipeSerializer(serializers.ModelSerializer):
    author_id = serializers.CharField(source='author.id')
    author = serializers.CharField(source='author.username')
    author_profile= serializers.ImageField(source='author.profile_pic')
    category_name = serializers.CharField(source='category.name')
    comments=serializers.PrimaryKeyRelatedField(many=True,read_only=True)
    category = CategorySerializer()

    class Meta:
        model = Recipe
        fields = ('id','author_profile','category', 'category_name', 'picture', 'recipe_name', 'instructions','is_private',
                  'ingredients','created_at','updated_at','author_id','author','views','revenue','report','comments','total_likes')
 


class PostRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model=Recipe
        fields='__all__'


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'
