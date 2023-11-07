import { ReviewType } from "@/app/types";

interface ReviewsContentProps {
  reviews: ReviewType[];
  product_id: number;
}

export default function ReviewsContent( {reviews, product_id}: ReviewsContentProps ) {
  function formatDate(inputDate: string) {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(inputDate).toLocaleDateString('en-US', options);
  }

  return (
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
  )
}