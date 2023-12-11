from django.http import JsonResponse
from django.db import DatabaseError
from django.conf import settings
import stripe
from rest_framework.decorators import api_view

@api_view(['POST'])
def stripe_payment(request):
  if request.method == 'POST':
    body = request.data
    print('stripe-payment what is body', body)

    # try:
    #   session =  stripe.checkout.sessions.create({
    #     payment_method_types: ['card'],
    #     mode:'payment',

    #   })
  return JsonResponse({'message': 'ur cute'}, status=201)