from django.db import models
from account.models import CustomUser
from adminpanel.models import Categories
# Create your models here.


class Recipe(models.Model):
    author=models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    recipe_name=models.CharField(max_length=100)
    category=models.ForeignKey(Categories,on_delete=models.CASCADE)
    picture=models.ImageField(upload_to='media',default='recipe')
    instructions=models.TextField()
    ingredients=models.TextField()
    created_at=models.DateTimeField(auto_now=False,auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True,auto_now_add=False)
    is_private=models.BooleanField(default=False)
    views=models.IntegerField(default=0)
    revenue=models.IntegerField(default=0)
    report=models.IntegerField(default=0)
    total_likes=models.PositiveIntegerField(default=0)
    def __str__(self) -> str:
        return self.recipe_name
    

class SavedRecipes(models.Model):
    user_id=models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    recipe_id=models.ForeignKey(Recipe,on_delete=models.CASCADE)

class Like(models.Model):
    user_id=models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    recipe_id=models.ForeignKey(Recipe,on_delete=models.CASCADE)

class Comment(models.Model):
    comment=models.TextField()
    user_id=models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    recipe_id=models.ForeignKey(Recipe,on_delete=models.CASCADE)
    created_at=models.DateTimeField(auto_now=False,auto_now_add=True)