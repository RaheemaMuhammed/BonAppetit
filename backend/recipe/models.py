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

    def __str__(self) -> str:
        return self.recipe_name