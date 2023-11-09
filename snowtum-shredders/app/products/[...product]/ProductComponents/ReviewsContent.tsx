import { ReviewType } from "@/app/types";
import { starFilledSVG, starEmptySVG } from "@/app/Misc/Icons";
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
      { reviews.map((review, i) => {
        const rating = review.snowboard_review_rating
        const emptyStarCount = 5 - rating

        // Create an array for filled star icons
        const filledStars = Array(rating).fill(
          starFilledSVG
        );

        // Create an array for empty star icons
        const emptyStars = Array(emptyStarCount).fill(
          starEmptySVG
        );

        return (
          <div className='spr-review mt-[24px] py-[24px]' id={`spr-review-${review.review_id}`} key={i}>
            {/* has horizontal line above each review */}
            <div className='spr-review-header flex flex-col mb-[13px]'>
              <span className='spr-starratings' aria-label={`${rating} of 5 stars`}>
                {filledStars}
                {emptyStars}
              </span>
              <h3 className='spr-review-header-title text-[14px] mt-[8px]'>{review.snowboard_review_title}</h3>
              <span className='spr-review-header-byline italic text-[12px]'>
                <strong>{review.snowboard_review_author}</strong> on <strong>{formatDate(review.snowboard_review_date)}</strong>
              </span>
            </div>

            <div className='spr-review-content text-[12px] mb-[24px]'>
              <p>{review.snowboard_review_body}</p>
            </div>
            <div className='spr-review-footer flex'>
              {/* //TODO contains onClikck function */}
              <a className='spr-review-reportreview uppercase underline text-[10px] font-bold ml-auto'
                  id={`report_${review.review_id}`}
                  href='#'>
                  Report as Inappropriate
              </a>
            </div>
          </div>

        )
      })}
      {/* has horizontal line above */}
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