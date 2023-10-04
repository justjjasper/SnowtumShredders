from django.http import JsonResponse
from .models import Snowboard, SnowboardImage, SnowboardReview, SnowboardSKU, TShirt, TShirtSKU, Hoodie, Headgear, Boardbag, BoardbagImage
from django.db import DatabaseError #

def mega_snowboards(request):
    snowboards = Snowboard.objects.all()

    formatted_snowboards = []
    for snowboard in snowboards:
        snowboard_data = {
            'snowboard_id': snowboard.snowboard_id,
            'snowboard_name': snowboard.snowboard_name,
            'snowboard_price': float(snowboard.snowboard_price),  # Convert to float if needed
            'header_image': snowboard.header_image,
            'header_description': snowboard.header_description,
            'shape': snowboard.shape,
            'sidecut': snowboard.sidecut,
            'flex': snowboard.flex,
            'rider_type': snowboard.rider_type,
            'tech_story': snowboard.tech_story,
            'camber_type': snowboard.camber_type,
            'camber_description': snowboard.camber_description,
            'camber_image': snowboard.camber_image,
            'snowboard_images': [img.snowboard_image for img in SnowboardImage.objects.filter(snowboard=snowboard)],
            'snowboard_sku': float(SnowboardSKU.objects.filter(snowboard=snowboard).latest('snowboard_sku').snowboard_sku),  # Get the latest SKU and convert to float if needed
            'snowboard_reviews': [
                {
                    'snowboard_review_title': review.snowboard_review_title,
                    'snowboard_review_author': review.snowboard_review_author,
                    'snowboard_review_date': review.snowboard_review_date.strftime('%Y-%m-%d'),  # Format as YYYY-MM-DD
                    'snowboard_review_rating': review.snowboard_review_rating,
                    'snowboard_review_body': review.snowboard_review_body,
                }
                for review in SnowboardReview.objects.filter(snowboard=snowboard)
            ],
        }
        formatted_snowboards.append(snowboard_data)

    return JsonResponse(formatted_snowboards, safe=False)

def get_snowboard_collection(request):
  # Fetch all snowboards and their corresponding images
  snowboards = Snowboard.objects.all()
  snowboard_data = []

  try:
    for snowboard in snowboards:
        # Get the first image for each snowboard
        snowboard_image = SnowboardImage.objects.filter(snowboard=snowboard).first()

        # Create an object with the desired format
        snowboard_obj = {
            'snowboard_name': snowboard.snowboard_name,
            'snowboard_price': float(snowboard.snowboard_price),  # Convert Decimal to float if needed
            'snowboard_image': snowboard_image.snowboard_image if snowboard_image else '',  # Use the image URL or an empty string if no image found
            'header_description': snowboard.header_description
        }

        snowboard_data.append(snowboard_obj)

    # Return the formatted data as JSON response
    return JsonResponse(snowboard_data, safe=False)
  except DatabaseError as e:
      # Handle database-related errors
      return JsonResponse({'error': 'Database error occurred'}, status=500)

  except Exception as e:
      # Handle other exceptions or errors
      return JsonResponse({'error': 'An error occurred'}, status=500)

def get_accessory_collection(request):
  try:
    tshirts = list(TShirt.objects.values('tshirt_name', 'tshirt_image', 'tshirt_price'))
    hoodies = list(Hoodie.objects.values('hoodie_name', 'hoodie_image', 'hoodie_price'))
    headgear = list(Headgear.objects.values('headgear_name', 'headgear_image', 'headgear_price'))

    # Retrieve the first image for each boardbag
    boardbag_data = []
    for boardbag in Boardbag.objects.all():
        boardbag_images = BoardbagImage.objects.filter(boardbag=boardbag)
        if boardbag_images.exists():
            first_image = boardbag_images.first().boardbag_image
        else:
            first_image = ""

        boardbag_data.append({
            'boardbag_name': boardbag.boardbag_name,
            'boardbag_image': first_image,
            'boardbag_price': boardbag.boardbag_price,
        })

    accessories_data = {
        'tshirts': tshirts,
        'hoodies': hoodies,
        'headgear': headgear,
        'boardbag': boardbag_data,
    }

    response_data = accessories_data

    return JsonResponse(response_data, safe=False)
  except DatabaseError as e:
        # Handle database-related errors
        return JsonResponse({'error': 'Database error occurred'}, status=500)

  except Exception as e:
      # Handle other exceptions or errors
      return JsonResponse({'error': 'An error occurred'}, status=500)

def get_snowboard_product(request, snowboard_name):
    try:
        # # Retrieve the snowboard name from the request object
        # snowboard_name = request.GET.get('snowboard_name')

        # if not snowboard_name:
        #     # Handle the case where snowboard_name is not provided in the request
        #     return JsonResponse({'error': 'Snowboard name is required'}, status=400)

        # Convert the provided snowboard name to the format stored in the database
        formatted_snowboard_name = snowboard_name.replace('-', ' ').upper()

        # Query the database to retrieve the snowboard product data
        snowboard = Snowboard.objects.get(snowboard_name=formatted_snowboard_name)

        # Query related data (images, reviews, sizes, skus)
        snowboard_images = list(SnowboardImage.objects.filter(snowboard=snowboard).values_list('snowboard_image', flat=True))
        snowboard_reviews = SnowboardReview.objects.filter(snowboard=snowboard).values(
            'snowboard_review_title',
            'snowboard_review_author',
            'snowboard_review_date',
            'snowboard_review_body',
            'snowboard_review_rating'
        )
        snowboard_sizes = list(SnowboardSKU.objects.filter(snowboard=snowboard).values_list('snowboard_size', flat=True))
        snowboard_skus = list(SnowboardSKU.objects.filter(snowboard=snowboard).values_list('snowboard_sku', flat=True))

        # Serialize the data into the desired format
        snowboard_data = {
            'id': snowboard.snowboard_id,
            'name': snowboard.snowboard_name,
            'image': snowboard.header_image,
            'header_description': snowboard.header_description,
            'price': str(snowboard.snowboard_price),  # Convert to string if needed
            'shape': snowboard.shape,
            'sidecut': snowboard.sidecut,
            'flex': snowboard.flex,
            'rider_type': snowboard.rider_type,
            'tech_story': snowboard.tech_story,
            'camber_type': snowboard.camber_type,
            'camber_description': snowboard.camber_description,
            'camber_image': snowboard.camber_image,
            'images': snowboard_images,
            'reviews': list(snowboard_reviews),
            'sizes': snowboard_sizes,
            'skus': snowboard_skus,
        }

        return JsonResponse(snowboard_data)

    except Snowboard.DoesNotExist:
        # Handle the case where the snowboard with the provided name does not exist
        return JsonResponse({'error': 'Snowboard not found'}, status=404)

def get_tshirt_product(request, tshirt_name):
  try:
    # Format queried product name to db product name
    formatted_tshirt_name = tshirt_name.replace('-', ' ').title()

    # Query from database to get product data
    tshirt = TShirt.objects.get(tshirt_name = formatted_tshirt_name)

    # Query related data from other databases
    tshirt_sizes = list(TShirtSKU.objects.filter(tshirt=tshirt).values_list('tshirt_size', flat=True))
    tshirt_skus = list(TShirtSKU.objects.filter(tshirt=tshirt).values_list('tshirt_sku', flat=True))

    # Format data into desired object
    tshirt_data = {
      'id': tshirt.tshirt_id,
      'name': tshirt.tshirt_name,
      'price': tshirt.tshirt_price,
      'description' : tshirt.tshirt_description,
      'images': [tshirt.tshirt_image],
      'sizes': tshirt_sizes,
      'skus': tshirt_skus
    }

    return JsonResponse(tshirt_data)

  except Snowboard.DoesNotExist:
    # Handle the case where the snowboard with the provided name does not exist
    return JsonResponse({'error': 'Tshirt not found'}, status=404)


