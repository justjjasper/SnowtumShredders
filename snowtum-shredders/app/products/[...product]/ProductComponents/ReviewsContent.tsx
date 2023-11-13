import { starFilledSVG, starEmptySVG } from "@/app/Misc/Icons";
import Pagination from "./Pagination";
import Link from "next/link";

interface ReviewsContentProps {
  reviews: ReviewType[];
  product_id: number;
  page: string;
}

// ! Use Param Queries as state as to to control product reviews pagination
// if there are no query params, just use the first page of the review pagination
//
export default function ReviewsContent( {reviews, product_id, page}: ReviewsContentProps ) {
  function formatDate(inputDate: string) {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(inputDate).toLocaleDateString('en-US', options);
  }

  let currentPage = 1
  let reviewsPerPage = Number(page) || 1

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
          {/* <span className='spr-pagination-page is-active'>1</span>
          <span className='spr-pagination-page'><a>2</a></span>
          <span>
           <Link href='http://localhost:3000/products/snowboard/indoor-survival?page=3#spr-container'>3</Link>
          </span>
          <span>
           <Link href='http://localhost:3000/products/snowboard/indoor-survival?page=4#spr-container'>4</Link>
          </span>
          <span className='spr-pagination-next absolute right-0'><a>Next</a></span> */}

        </div>
      </div>
    </div>
  )
}