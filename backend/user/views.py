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
from decimal import Decimal
from adminpanel.serializers import UserSerializer
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
                 return Response({'status':200,'message':f'Recipe {recipe} deleted successfully'})
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
                categories=Categories.objects.filter(is_disabled=False).order_by('-id')
                serializer=CategorySerializer(categories,many=True)
                return Response({'payload':serializer.data,'message':'success'})
            except Exception as e:
                return Response({'error':str(e)})
            
# For Liking and removing like
class LikeRecipe(APIView):
      authentication_classes = [JWTAuthentication]
      permission_classes = [IsAuthenticated]

      def get(self,request):
           try:
                user=request.user.id
                liked_recipes=Recipe.objects.filter(like__user_id=user)
                serializer=RecipeSerializer(liked_recipes,many=True)
                return Response({'payload':serializer.data,'status':200})
           except Exception as e:
                return Response({'error':str(e)})

      def patch(self,request):
            try:
                data=request.data
                recipe_id=data['recipe_id']
                recipe = Recipe.objects.get(pk=recipe_id)
                user=request.user
    

                try:
                    like= Like.objects.get(user_id=user,recipe_id=recipe)
                    like.delete()
                    recipe.total_likes-=1
                    author_id=recipe.author.id
                    author=CustomUser.objects.get(pk=author_id)
                    if author.wallet > 0.05 and recipe.is_private==True:
                        author.wallet=Decimal(author.wallet)-Decimal('0.05')
                        author.save()
                        print(author.wallet)
                except Like.DoesNotExist:
                        Like.objects.create(user_id=user,recipe_id=recipe)
                        recipe.total_likes+=1
                        author_id=recipe.author.id
                        if recipe.is_private == True:
                            author=CustomUser.objects.get(pk=author_id)
                            author.wallet=Decimal(author.wallet)+Decimal('0.05')
                            author.save()

                recipe.save()
                serializer=RecipeSerializer(recipe,partial=True)
                return Response(serializer.data)

                 
            except Exception as e:
                 return Response({'error':str(e)})
            
# For recipe saving
class SavedRecipe(APIView):
      authentication_classes = [JWTAuthentication]
      permission_classes = [IsAuthenticated]

      def get(self,request):
           try:
                user=request.user.id
                saved_recipes=SavedRecipes.objects.filter(user_id=user)
                recipe_ids=saved_recipes.values_list('recipe_id',flat=True)
                recipes=Recipe.objects.filter(pk__in=recipe_ids)
                serializer=RecipeSerializer(recipes,many=True)
                return Response({'payload':serializer.data,'status':200})
           except Exception as e:
                return Response({'error':str(e)})
           

      def patch(self,request):
            try:
                data=request.data
                recipe_id=data['recipe_id']
                recipe=Recipe.objects.get( pk=recipe_id)

                if recipe_id is not None:
                        user=request.user
                        try:
                            saved_recipe=SavedRecipes.objects.get(user_id=user,recipe_id=recipe_id)
                            saved_recipe.delete()
                            author_id=recipe.author.id
                            author=CustomUser.objects.get(pk=author_id)
                            if author.wallet > 0.05 and recipe.is_private == True:
                                author.wallet=Decimal(author.wallet)-Decimal(0.05)
                                author.save()
                            return Response({'status':200,'message':'Recipe Removed Successfully'})
                        except SavedRecipes.DoesNotExist:
                            
                            SavedRecipes.objects.create(user_id=user,recipe_id=recipe)
                            author_id=recipe.author.id
                            if recipe.is_private == True:
                                    author=CustomUser.objects.get(pk=author_id)
                                    author.wallet=Decimal(author.wallet)+Decimal(0.05)
                                    
                                    author.save()
                            return Response({'status':200,'message':'Recipe Added to Saved List Successfully'})
            except Exception as e:
                return Response({'error':str(e)})

# List recipes of current user
class UserRecipe(APIView):
        authentication_classes = [JWTAuthentication]
        permission_classes = [IsAuthenticated]
   
        # list current user's recipes
        def get(self,request):
             try:
                user=request.user
                print(user)
                recipes=Recipe.objects.filter(author=user)
                serializer=RecipeSerializer(recipes,many=True)
                return Response({'payload':serializer.data,'status':200})
             except Exception as e:
                  return Response({'error':str(e)})
                  
        # editing recipe

        def patch(self,request):
            data=request.data
            try:
                    recipe=Recipe.objects.get(id=data['recipe_id'])
                    print(recipe)
                    serializer=PostRecipeSerializer(instance=recipe,data=data,partial=True)
                    print(data)
                    if not serializer.is_valid():
                        return Response({'status':300,'error':serializer.errors,'message':'somthing for serializer'})   
                    serializer.save()
                    return Response({'status':200,'message': f'{recipe} updated successfully'})

            except Exception as e:
                return Response({'error':str(e)})
            

        # deleting a recipe
        def delete(self,request):
                try:
                    id=request.GET.get('id')
                    recipe=Recipe.objects.get(id=id)
                    recipe.delete()
                    return Response({'status':200,'message':f'Recipe {recipe} deleted successfully'})
                except Exception as e:
                    return Response({'error':str(e)})

     
# profile page for users and editing
class UserProfile(APIView):
        authentication_classes = [JWTAuthentication]
        permission_classes = [IsAuthenticated]

        # get details
        def get(self,request):
             try:
                  id=request.user.id
                  user=CustomUser.objects.get(pk=id)
                  serializer=UserSerializer(user)
                  return Response({'payload':serializer.data,'message':'OK','status':200})
             except Exception as e:
                  return Response({'error':str(e)})

        
        # edit profile
        def patch(self,request):
             pass