'use client'
import { ReviewType } from "@/app/types"
import ProductReviewsForm from "./ProductReviewsForm";
import ReviewsContent from "./ReviewsContent";
import { calcAvgStarRating } from "../page";
import AverageStarRating from "@/app/components/AverageStarRating";
import React, { useState } from "react";

interface ProductReviewsProps {
  reviews: ReviewType[];
  product_id: number
}

export default function ProductReviews ( {reviews, product_id}: ProductReviewsProps ) {
  const ratingAvg = calcAvgStarRating(reviews)

  const [toggleForm, setToggleForm] = useState<boolean>(false)

  const handleToggle = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setToggleForm(!toggleForm)
  }

  return (
    <section className='content-container-product-reviews max-w-[1920px]'>  {/* <---- Responsible for max width of 1920px */}
      <div className='content-wider lg:px-16'>  {/* Responsible for px */}
        <div className='product-reviews border-[1px] rounded-[30px] tracking-normal my-[80px]'> {/* Responsible for my/border */}
          <div className='page-width'>
            <div className='reviews'>
              <div className='spr-container'>
                <div className='spr-header'>
                  <h2 className='spr-header-title font-bold text-[36px]'>Customer Reviews</h2>

                  <div className='spr-summary flex items-center pt-2 text-[14px]'>
                    <span className='spr-starrating' aria-label={`${ratingAvg.toFixed(1)} of 5 stars`} role='img'>
                      <AverageStarRating reviews={reviews} />
                    </span>
                    <span className='spr-summary-caption ml-2'>
                      <span className='spr-summary-actions-togglereviews'>Read all {reviews.length === 1 ? reviews.length + ' review' : reviews.length + ' reviews'}</span>
                    </span>
                    <span className='spr-summary-actions ml-auto'>
                      <a href='#' className='spr-summary-actions-newreview uppercase underline font-bold' onClick={handleToggle}>Write a review</a>
                    </span>
                  </div>
                </div>
                {/* Top of spr-content has a dashed line */}
                <div className='spr-content'>
                  {/* Form to write a new review*/}
                  { toggleForm && <ProductReviewsForm product_id={product_id}/> }
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