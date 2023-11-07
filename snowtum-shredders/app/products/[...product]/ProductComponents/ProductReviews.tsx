import { ReviewType } from "@/app/types"
import ProductReviewsForm from "./ProductReviewsForm";

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

  function formatDate(inputDate: string) {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(inputDate).toLocaleDateString('en-US', options);
  }

  const ratingAvg = calculateRatingAverage(reviews)
  console.log(reviews)
  return (
    <section className='content-container-product-reviews max-w-[1920px]'>  {/* <---- Responsible for max width of 1920px */}
      <div className='content-wider lg:px-16'>  {/* Responsible for px */}
        <div className='product-reviews border-[1px] rounded-[30px] tracking-normal mt-[40px]'> {/* Responsible for mt/border */}
          <div className='page-width'>
            <div className='reviews'>
              <div className='spr-container'>
                <div className='spr-header'>
                  <div>Customer Reviews</div>
                  <div className='spr-summary'>
                    <span className='spr-starrating' aria-label={`${ratingAvg.toFixed(1)} of 5 stars`} role='img'>
                      5 icon stars
                    <i aria-hidden={true}/>
                    </span>
                    <span className='spr-summary-caption'>
                      <span className='spr-summary-actions-togglereviews'>Read all {reviews.length === 1 ? reviews.length + ' review' : reviews.length + ' reviews'}</span>
                      <span className='spr-summary-actions'>
                        <a href='#' className='spr-summary-actions-newreview'>Write a review</a>
                      </span>
                    </span>
                  </div>
                </div>
                {/* Top of spr-content has a dashed line */}
                <div className='spr-content'>
                  {/* Form to write a new review*/}
                  <ProductReviewsForm product_id={product_id}/>

                  <div className='spr-reviews mt-[24px]' id={`reviews_${product_id}`}>
                    {/* mapped out review divs */}
                    {/* The end of each review has a dashed line*/}

                    { reviews.map((review, i) => {

                      return (
                        <div className='spr-review mt-[24px] py-[24px]' id={`spr-review-${review.review_id}`} key={i}>

                          <div className='spr-review-header'>
                            <span className='spr-starratings' aria-label={`${review.snowboard_review_rating} of 5 stars`}>
                              <i className='spr-icon spr-icon-star' aria-hidden='true'></i>
                              <i className='spr-icon spr-icon-star' aria-hidden='true'></i>
                              <i className='spr-icon spr-icon-star' aria-hidden='true'></i>
                              <i className='spr-icon spr-icon-star' aria-hidden='true'></i>
                              <i className='spr-icon spr-icon-star' aria-hidden='true'></i>
                            </span>
                            <h3 className='spr-review-header-title'>{review.snowboard_review_title}</h3>
                            <span className='spr-review-header-byline italic'>
                              <strong>{review.snowboard_review_author}</strong> on <strong>{formatDate(review.snowboard_review_date)}</strong>
                            </span>
                          </div>
                          <div className='spr-review-content'>
                            <p>{review.snowboard_review_body}</p>
                          </div>
                          <div className='spr-review-footer'>
                            {/* //TODO contains onClikck function */}
                            <a className='spr-review-reportreview uppercase underline'
                                id={`report_${review.review_id}`}
                                href='#'>
                                Report as Inappropriate
                            </a>
                          </div>
                        </div>

                      )
                    })}
                    <div className='spr-pagination relative pt-[10px]'>
                      <div>
                        {/* mapped out paginaton spans*/}
                        <span className='spr-pagination-page is-active'>1</span>
                        <span className='spr-pagination-page'><a>2</a></span>
                        <span className='spr-pagination-next absolute right-0'><a>Next</a></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}