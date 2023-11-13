'use client'
import React, { useState } from 'react'
import FormStars from './FormStars'
import { submitReview } from '@/app/serverActions/submitReview'
import { postReviewAPI } from '@/app/config';

interface ProductReviewsFormProps {
  product_id: number;
  formSubmitted: boolean;
  setFormSubmitted: (prevState: boolean) => void
}

export default function ProductReviewsForm ( {product_id, formSubmitted, setFormSubmitted}: ProductReviewsFormProps ) {
  // Responsible for selected star rating
  const [rating, setRating] = useState<number>(0)
  const [formError, setFormError] = useState<boolean>(false)

  const [charCount, setCharCount] = useState<number>(0)
  const handleTextareaInput = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    setCharCount(text.length)
  }

  // Handles form validation/edge case. Passes form to serverside function submitReview for backend logic
  const handleSubmit = async (e: FormData) => {
    const author = e.get('review[author]')?.toString()
    const email = e.get('review[email]')?.toString()
    const title = e.get('review[title]')?.toString()
    const body = e.get('review[body]')?.toString()
    e.set('review[rating]', rating.toString())

    const csrfToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)csrftoken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )

    const reviewBody = {
      snowboard_id: product_id,
      author,
      email,
      title,
      body,
      rating,
      date: ''
    }

    // ? Dont forget to uncomment
    // if (!name || !email || !title || !body || !rating ) {
    //   setFormError(!formError)
    //   return
    // }

    // TODO handle logic
    //  if posting review was successful, close the Write Review Span from parent component
    // change submitReview to a variable = await and ??
    submitReview(e, reviewBody, csrfToken)
    setFormSubmitted(true)
  }

  return (
    // ! Be wary that there are solo value attr with each input in the form
    <div className='spr-form mt-[24px] pt-[24px] border-t-[1px]' id={`form_${product_id}`}>
      {/* //TODO: Fill in server api later */}
      <form action={(e) => handleSubmit(e)} id={`new-review-form_${product_id}`} className='new-review-form pt-[24px]'>
        {/* These two inputs are for structuring body data to send to the server with "HTML" post */}
        <input type='hidden' name='review[rating]'/>
        <input type='hidden' name='product_id' value={product_id}/>
        <h3 className='spr-form-title text-[14px] leading-[22px]'>Write a review</h3>
        { formSubmitted ? (
          <div className='text-[14px]'>Thank you for submitting a review!</div>
        ) : (
        <>
          { formError && <div className='spr-form-message spr-form-message-error text-[14px] text-primary border-[1px] bg-[#C0363A] p-[10px] mb-[1em]'>Not all fields have been filled out correctly!</div> }
          <fieldset className='spr-form-contact'>
            <div className='spr-form-contact-name'>
              <label className='spr-form-label' htmlFor={`review_author_${product_id}`}>Name</label>
              <input className='spr-form-input spr-form-input-text' type='text' id={`review_author_${product_id}`} name='review[author]' placeholder='Enter your name'/>
            </div>
            <div className='spr-form-contact-email'>
              <label className='spr-form-label' htmlFor={`review_email_${product_id}`}>Email</label>
              <input className='spr-form-input spr-form-input-email' type='email' id={`review_email_${product_id}`} name='review[email]' placeholder='john.smith@example.com' />
            </div>
          </fieldset>

          <fieldset className='spr-form-review'>
            <FormStars rating={rating} setRating={setRating}/>

            <div className='spr-form-review-title'>
              <label className='spr-form-label' htmlFor={`review_title_${product_id}`}>Review Title</label>
              <input className='spr-form-input' type='text' id={`review_title_${product_id}`} name='review[title]' placeholder='Give your review a title'/>
            </div>

            <div className='spr-form-review-body'>
              <label className='spr-form-label' htmlFor={`review_body_${product_id}`}>
                  Body of Review
                <span role='status' aria-live='polite' aria-atomic='true'>
                  <span className='spr-form-review-body-charactersremaining'> {`(${1500 - charCount})`}</span>
                  {/* This second span is for screen readers to count  */}
                  <span className='visuallyhidden'>charactersremaining</span>
                </span>
              </label>

              <div className='spr-form-input'>
                <textarea className='spr-form-input'
                    id={`review_body_${product_id}`}
                    data-product-id={product_id}
                    name='review[body]'
                    rows={10}
                    placeholder='Write your comments here'
                    onChange={handleTextareaInput}>
                </textarea>
              </div>
            </div>
          </fieldset>

          <fieldset className='spr-form-actions flex'>
            <button className='spr-button uppercase flex h-[65px] bg-[#fff] border-[1px] min-w-[340px] py-[21px] px-[20px] rounded-[30px] ml-auto font-bold justify-center tracking-wide' type='submit'>Submit Review</button>
          </fieldset>
        </>
      )}
      </form>
    </div>
  )
}