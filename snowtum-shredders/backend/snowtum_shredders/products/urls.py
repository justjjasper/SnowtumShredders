# Create urls to append to Project's url
from django.urls import path
from . import views

urlpatterns = [
  path('megasnowboards/', views.mega_snowboards),
  path('snowboards/', views.get_snowboard_collection),
  path('accessories/', views.get_accessory_collection),
  path('snowboard/<str:snowboard_name>/', views.get_snowboard_product),
]