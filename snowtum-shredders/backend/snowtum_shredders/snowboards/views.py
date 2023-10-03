from django.http import JsonResponse
from .models import Snowboard, SnowboardImage, SnowboardReview, SnowboardSKU

def get_snowboards(request):
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

def get_collection_snowboards(request):
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