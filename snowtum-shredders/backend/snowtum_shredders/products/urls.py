# Create urls to append to Project's url
from django.urls import path
from . import views

urlpatterns = [
  path('allsnowboards/', views.get_all_snowboards),
  path('snowboards/', views.get_snowboards),
  path('accessories/', views.get_accessories),
]