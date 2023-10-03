from django.http import JsonResponse
from .models import Snowboard, SnowboardImage, SnowboardReview, SnowboardSKU, TShirt, Hoodie, Headgear, Boardbag, BoardbagImage

def get_all_snowboards(request):
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

def get_snowboards(request):
    # Fetch all snowboards and their corresponding images
    snowboards = Snowboard.objects.all()
    snowboard_data = []

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

def get_accessories(request):
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

    response_data = [accessories_data]

    return JsonResponse(response_data, safe=False)
