from django.http import JsonResponse
from django.db import DatabaseError
from django.conf import settings
from products.models import Snowboard  # Import your model
import stripe
from rest_framework.decorators import api_view

@api_view(['POST'])
def stripe_payment(request):
    if request.method == 'POST':
        body = request.data
        print('stripe-payment what is body', body)

        try:
            stripe.api_key = settings.STRIPE_PRIVATE_KEY

            line_items = []

            for cart_item in body.get('cartItems', []):
                # Query the database to get the price based on product information
                product = Snowboard.objects.get(snowboard_id=cart_item['id'])
                price = float(product.snowboard_price)

                line_items.append({
                    'price_data': {
                        'product_data': {
                            'name': cart_item['name']
                        },
                        'currency': 'usd',
                        'unit_amount': int(price * 100),  # Convert price to cents
                    },
                    'quantity': cart_item['quantity'],
                })

            session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                mode='payment',
                line_items=line_items,
                success_url='http://localhost:3000/pages/success',
                cancel_url='http://localhost:3000/pages/cancel'
            )

            print('what is checkoutid stripe payment', session.id)
            return JsonResponse({'url': session.url}, status=201)
        except Exception as e:
            print(f'Error creating Stripe session: {str(e)}')
            return JsonResponse({'message': 'Stripe Payment failed from backend'}, status=500)
