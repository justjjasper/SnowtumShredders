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

    try:
      stripe.api_key = settings.STRIPE_PRIVATE_KEY
      price_id = 'price_12'

      session =  stripe.checkout.Session.create(
        payment_method_types = ['card'],
        mode='payment',
        line_items=[{
          'price_data': {
            'product_data': {
              'name': 'Item A',
            },
            'currency': 'usd',
            'unit_amount': 1099,
          },
          'quantity': 3,
        }],
        success_url= 'http://localhost:3000/pages/success',
        cancel_url= 'http://localhost:3000/pages/cancel'
      )
      print('what is session stripe payment', session.url)
      return JsonResponse({'url': session.url}, status=201)
    except Exception as e:
      print(f'Error creating Stripe session: {str(e)}')
      return JsonResponse({'message': 'Stripe Payment failed from backend'}, status=500)
