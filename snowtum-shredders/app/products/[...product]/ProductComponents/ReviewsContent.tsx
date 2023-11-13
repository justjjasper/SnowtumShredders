import { starFilledSVG, starEmptySVG } from "@/app/Misc/Icons";
import Link from "next/link";
import Report from './Report'

interface ReviewsContentProps {
  reviews: ReviewType[];
  product_id: number;
  page: string;
  productName: string;
}

// Used param queries as state for product reviews page/ pagination
export default function ReviewsContent( {reviews, product_id, page, productName}: ReviewsContentProps ) {
  function formatDate(inputDate: string) {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(inputDate).toLocaleDateString('en-US', options);
  }

  let currentPage = Number(page) || 1
  let reviewsPerPage = 3

  const totalPages = Math.ceil(reviews.length / reviewsPerPage)

  const indexOfLastReview = currentPage * reviewsPerPage
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview)

  return (
    <div className='spr-reviews mt-[24px]' id={`reviews_${product_id}`}>

      {/* mapped out review divs */}
      { currentReviews.map((review, i) => {
        const rating = review.snowboard_review_rating
        const emptyStarCount = 5 - rating

        // Create an array for filled star icons
        const filledStars = Array(rating).fill(
          starFilledSVG
        )

        // Create an array for empty star icons
        const emptyStars = Array(emptyStarCount).fill(
          starEmptySVG
        )

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
            <Report review_id={review.review_id}/>
          </div>

        )
      })}
      {/* has horizontal line above */}
      <div className='spr-pagination relative pt-[10px]'>
        <div className='flex justify-center'>
          <span className={`spr-pagination-prev absolute left-0 cursor-pointer underline ${currentPage === 1 ? 'hidden' : ''}`}>
            <Link href={`http://localhost:3000/products/snowboard/${productName}?page=${currentPage - 1}#spr-container`}>Previous</Link>
          </span>
          {Array.from({ length: totalPages }, (_, index:number) => (
            <span key={index}
              className={`spr-pagination-page underline mx-1 ${index + 1 === currentPage ? 'is-active' : ''}`}>
              <Link
                href={`http://localhost:3000/products/snowboard/${productName}?page=${index + 1}#spr-container`}>
                  {index + 1}
              </Link>
            </span>
          ))}
          <span className={`spr-pagination-next absolute right-0 cursor-pointer underline ${currentPage === totalPages ? 'hidden' : ''}`}>
            <Link href={`http://localhost:3000/products/snowboard/${productName}?page=${currentPage + 1}#spr-container`}
            className="text-center">Next</Link>
          </span>
        </div>
      </div>
    </div>
  )
}