from django.http import JsonResponse
from .models import *
from django.db import DatabaseError #

def custom_title_case(text):
        # Split the text by spaces
        words = text.split(' ')

        # List of words to keep in uppercase
        uppercase_words = ['sb', 'mfg', 'mars1']  # Add other words as needed

        # Apply title case, but keep specific words in uppercase
        title_case_words = [word.title() if word not in uppercase_words else word.upper() for word in words]

        # Join the words back together with spaces
        return ' '.join(title_case_words)

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

def get_product_collections(request):
    snowboards = Snowboard.objects.all()
    product_data = []

    try:
        for snowboard in snowboards:
            # Get the first image for each snowboard
            snowboard_image = SnowboardImage.objects.filter(snowboard=snowboard).first()

            # Create an object with the desired format
            snowboard_obj = {
                'id': snowboard.snowboard_id,
                'name': snowboard.snowboard_name,
                'image': snowboard_image.snowboard_image if snowboard_image else '',  # Use the image URL or an empty string if no image found
                'description': snowboard.header_description,
                'category': 'snowboard'
            }

            product_data.append(snowboard_obj)

        # Create a list of the other products and format the data
        tshirts = list(TShirt.objects.values('tshirt_id', 'tshirt_name', 'tshirt_image', 'tshirt_description'))
        tshirt_data = [{'id': tshirt['tshirt_id'], 'name': tshirt['tshirt_name'], 'image': tshirt['tshirt_image'], 'description': tshirt['tshirt_description'], 'category': 'tshirt'} for tshirt in tshirts]

        hoodies = list(Hoodie.objects.values('hoodie_id', 'hoodie_name', 'hoodie_image', 'hoodie_description'))
        hoodie_data = [{'id': hoodie['hoodie_id'], 'name': hoodie['hoodie_name'], 'image': hoodie['hoodie_image'], 'description': hoodie['hoodie_description'], 'category': 'hoodie'} for hoodie in hoodies]

        headgear = list(Headgear.objects.values('headgear_id', 'headgear_name', 'headgear_image', 'headgear_description'))
        headgear_data = [{'id': item['headgear_id'], 'name': item['headgear_name'], 'image': item['headgear_image'], 'description': item['headgear_description'], 'category': 'headgear'} for item in headgear]

        # Retrieve the first image for each boardbag
        boardbag_data = []
        for boardbag in Boardbag.objects.all():
            boardbag_images = BoardbagImage.objects.filter(boardbag=boardbag)
        if boardbag_images.exists():
            first_image = boardbag_images.first().boardbag_image
        else:
            first_image = ""

        boardbag_data.append({
            'id': boardbag.boardbag_id,
            'name': boardbag.boardbag_name,
            'image': first_image,
            'price': boardbag.boardbag_price,
            'category': 'boardbag'
        })

        # Append individual product lists to the product_data list
        product_data.extend(tshirt_data)
        product_data.extend(hoodie_data)
        product_data.extend(headgear_data)
        product_data.extend(boardbag_data)

        return JsonResponse(product_data, safe=False)
    except DatabaseError as e:
      # Handle database-related errors
      return JsonResponse({'error': 'Error retrieving product collections from database'}, status=500)
    except Exception as e:
      # Handle other exceptions or errors
      return JsonResponse({'error': 'An error occurred'}, status=500)

def get_snowboard_collection(request):
  # Fetch all snowboards and their corresponding images
  snowboards = Snowboard.objects.all()
  snowboard_data = []

  try:
    for snowboard in snowboards:
        # Get the first image for each snowboard
        snowboard_image = SnowboardImage.objects.filter(snowboard=snowboard).first()

        # Fetch related snowboard sizes and SKUs
        snowboard_skus = SnowboardSKU.objects.filter(snowboard=snowboard)

         # Create an array of objects with snowboard Size and SKU
        snowboard_meta_data = [{'size': sku.snowboard_size, 'sku': sku.snowboard_sku} for sku in snowboard_skus]

        # Create an object with the desired format
        snowboard_obj = {
            'snowboard_id': snowboard.snowboard_id,
            'snowboard_name': snowboard.snowboard_name,
            'snowboard_price': float(snowboard.snowboard_price),  # Convert Decimal to float if needed
            'snowboard_image': snowboard_image.snowboard_image if snowboard_image else '',  # Use the image URL or an empty string if no image found
            'header_description': snowboard.header_description,
            'snowboard_meta_data': snowboard_meta_data
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
    tshirts = list(TShirt.objects.values('tshirt_id', 'tshirt_name', 'tshirt_image', 'tshirt_price'))
    hoodies = list(Hoodie.objects.values('hoodie_id', 'hoodie_name', 'hoodie_image', 'hoodie_price'))
    headgear = list(Headgear.objects.values('headgear_id', 'headgear_name', 'headgear_image', 'headgear_price'))

    # Retrieve the first image for each boardbag
    boardbag_data = []
    for boardbag in Boardbag.objects.all():
        boardbag_images = BoardbagImage.objects.filter(boardbag=boardbag)
        if boardbag_images.exists():
            first_image = boardbag_images.first().boardbag_image
        else:
            first_image = ""

        boardbag_data.append({
            'boardbag_id': boardbag.boardbag_id,
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

        return JsonResponse(snowboard_data, safe=False)

    except Snowboard.DoesNotExist:
        # Handle the case where the snowboard with the provided name does not exist
        return JsonResponse({'error': 'Snowboard not found'}, status=404)

def get_tshirt_product(request, tshirt_name):
  try:
    # Format queried product name to db product name
    formatted_tshirt_name = custom_title_case(tshirt_name.replace('-', ' '))

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

    return JsonResponse(tshirt_data, safe=False)

  except TShirt.DoesNotExist:
    # Handle the case where the snowboard with the provided name does not exist
    return JsonResponse({'error': 'Tshirt not found'}, status=404)

def get_hoodie_product(request, hoodie_name):
    try:
        formatted_hoodie_name = custom_title_case(hoodie_name.replace('-', ' '))

        hoodie = Hoodie.objects.get(hoodie_name = formatted_hoodie_name)

        hoodie_sizes = list(HoodieSKU.objects.filter(hoodie=hoodie).values_list('hoodie_size', flat=True))
        hoodie_skus = list(HoodieSKU.objects.filter(hoodie=hoodie).values_list('hoodie_sku', flat=True))

        hoodie_data = {
            'id': hoodie.hoodie_id,
            'name': hoodie.hoodie_name,
            'price': hoodie.hoodie_price,
            'description': hoodie.hoodie_description,
            'images': [hoodie.hoodie_image],
            'sizes': hoodie_sizes,
            'skus': hoodie_skus
        }

        return JsonResponse(hoodie_data)
    except Hoodie.DoesNotExist:
    # Handle the case where the snowboard with the provided name does not exist
        return JsonResponse({'error': 'Hoodie not found'}, status=404)

def get_headgear_product(request, headgear_name):
    try:
        formatted_headgear_name = custom_title_case(headgear_name.replace('-', ' '))

        headgear = Headgear.objects.get(headgear_name = formatted_headgear_name)

        headgear_data = {
            'id': headgear.headgear_id,
            'name': headgear.headgear_name,
            'price': headgear.headgear_price,
            'description': headgear.headgear_description,
            'images': [headgear.headgear_image],
            'sizes': ['ONE SIZE'],
            'skus': [headgear.headgear_sku]
        }

        return JsonResponse(headgear_data, safe=False)
    except Headgear.DoesNotExist:
    # Handle the case where the snowboard with the provided name does not exist
        return JsonResponse({'error': 'Headgear not found'}, status=404)

def get_boardbag_product(request, boardbag_name):
    try:
        formatted_boardbag_name = custom_title_case(boardbag_name.replace('-', ' '))

        boardbag = Boardbag.objects.get(boardbag_name = formatted_boardbag_name)

        boardbag_images = list(BoardbagImage.objects.filter(boardbag=boardbag).values_list('boardbag_image', flat=True))

        boardbag_data = {
            'id': boardbag.boardbag_id,
            'name': boardbag.boardbag_name,
            'price': boardbag.boardbag_price,
            'description': boardbag.boardbag_description,
            'images': boardbag_images,
            'sizes': [boardbag.boardbag_size],
            'skus': [boardbag.boardbag_sku]
        }

        return JsonResponse(boardbag_data, safe=False)
    except Boardbag.DoesNotExist:
    # Handle the case where the snowboard with the provided name does not exist
        return JsonResponse({'error': 'Boardbag not found'}, status=404)

