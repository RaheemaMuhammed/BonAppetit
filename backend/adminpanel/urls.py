from django.urls import path
from .views import *


urlpatterns = [
    path('users/',UserList.as_view()),
    path('categories/',CategoryList.as_view()),
  
]