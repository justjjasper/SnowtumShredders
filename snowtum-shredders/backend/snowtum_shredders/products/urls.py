# Create urls to append to Project's url
from django.urls import path
from . import views

urlpatterns = [
  path('megasnowboards/', views.mega_snowboards),
  path('snowboards/', views.get_snowboard_collection),
  path('accessories/', views.get_accessory_collection),
  path('snowboard/<str:snowboard_name>/', views.get_snowboard_product),
  path('tshirt/<str:tshirt_name>/', views.get_tshirt_product),
  path('hoodie/<str:hoodie_name>/', views.get_hoodie_product),
  path('headgear/<str:headgear_name>/', views.get_headgear_product)
]