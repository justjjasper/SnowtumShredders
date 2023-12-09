from django.http import JsonResponse
from django.db import DatabaseError #
from rest_framework.decorators import api_view

@api_view(['POST'])
def stripe_payment(request):
  if request.method == 'POST':
    body = request.data
    print('stripe-payment what is body', body)
  return JsonResponse({'message': 'ur cute'}, status=201)