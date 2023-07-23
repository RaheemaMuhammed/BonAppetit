from django.urls import path
from .views import *


urlpatterns=[
    path('recipes/',RecipeList.as_view()),
    path('single_recipe/',SingleRecipe.as_view()),
    path('categories/',CategoryListing.as_view()),
    path('like/',LikeRecipe.as_view())
]