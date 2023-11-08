import { ReviewType } from "@/app/types"
import ProductReviewsForm from "./ProductReviewsForm";
import ReviewsContent from "./ReviewsContent";

interface ProductReviewsProps {
  reviews: ReviewType[];
  product_id: number
}

export default function ProductReviews ( {reviews, product_id}: ProductReviewsProps ) {
  const calculateRatingAverage = (reviews: ReviewType[]) => {
    let ratingAvg = 0

    for (let review of reviews) {
      ratingAvg += review.snowboard_review_rating
    }

    return ratingAvg / reviews.length
  }

  const ratingAvg = calculateRatingAverage(reviews)

  return (
    <section className='content-container-product-reviews max-w-[1920px]'>  {/* <---- Responsible for max width of 1920px */}
      <div className='content-wider lg:px-16'>  {/* Responsible for px */}
        <div className='product-reviews border-[1px] rounded-[30px] tracking-normal my-[80px]'> {/* Responsible for my/border */}
          <div className='page-width'>
            <div className='reviews'>
              <div className='spr-container'>
                {/* Attach dashed line at the end of spr-header */}
                <div className='spr-header'>
                  <h2 className='spr-header-title font-bold text-[36px]'>Customer Reviews</h2>
                  <div className='spr-summary pt-2 pb-5'>
                    <span className='spr-starrating' aria-label={`${ratingAvg.toFixed(1)} of 5 stars`} role='img'>
                      5 icon stars
                    <i aria-hidden={true}/>
                    </span>
                    <span className='spr-summary-caption'>
                      <span className='spr-summary-actions-togglereviews'>Read all {reviews.length === 1 ? reviews.length + ' review' : reviews.length + ' reviews'}</span>
                      <span className='spr-summary-actions'>
                        <a href='#' className='spr-summary-actions-newreview uppercase underline'>Write a review</a>
                      </span>
                    </span>
                  </div>
                </div>
                {/* Top of spr-content has a dashed line */}
                <div className='spr-content'>
                  {/* Form to write a new review*/}
                  <ProductReviewsForm product_id={product_id}/>
                  <ReviewsContent reviews={reviews} product_id={product_id}/>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}