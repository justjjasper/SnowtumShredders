'use client'
import { useState } from 'react'

interface ProductReviewsFormProps {
  product_id: number
}

interface HoveredType {
  star1: boolean;
  star2: boolean;
  star3: boolean;
  star4: boolean;
  star5: boolean;
}
export default function ProductReviewsForm ( {product_id}: ProductReviewsFormProps ) {

  const [hovered, setHovered] = useState<HoveredType>({
    star1: false,
    star2: false,
    star3: false,
    star4: false,
    star5: false
  })

  const { star1, star2, star3, star4, star5} = hovered

  return (
    // ! Be wary that there are solo value attr with each input in the form
    <div className='spr-form ' id={`form_${product_id}`}>
      {/* //TODO: Fill in server api later */}
      <form method='post' action='FILL THIS IN LATER' id={`new-review-form_${product_id}`} >
        {/* These two inputs are for structuring body data to send to the server with "HTML" post */}
        <input type='hidden' name='review[rating]'/>
        <input type='hidden' name='product_id' value={product_id}/>
        <h3 className='spr-form-title'>Write a review</h3>

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
          <div className='spr-form-review-rating mb-[15px]'>
            <label className='spr-form-label' htmlFor='review[rating]'>Rating</label>
            {/* //! LOOK BACK AT THIS UGH Star Rating logic*/}
            <div className='spr-form-input spr-starrating flex gap-1'>
              {/* //TODO each a tag contains an onClick func */}
              {/* //? each a contains classname of spr-icon-star-hover */}
              <a href='#'
                 className={`spr-icon spr-icon-star spr-icon-star-empty ${star1 ? 'spr-icon-star-hover' : ''}`}
                 data-value={'1'}
                 aria-label='1 of 5 stars'
                 onMouseEnter={() => setHovered(prevState => ({...prevState, star1:true}))}
                 onMouseLeave={() => setHovered(prevState => ({...prevState, star1:false}))}>
                 <svg viewBox="0 0 15 15" stroke='gray' aria-hidden={true} xmlns="http://www.w3.org/2000/svg" className='w-[17px] h-[17px] md:w-[25px] md:h-[25px]'> <path d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z" fill="none" /></svg>
              </a>
              <a href='#'
                className={`spr-icon spr-icon-star spr-icon-star-empty ${star2 ? 'spr-icon-star-hover' : ''}`}
                data-value={'2'}
                aria-label='2 of 5 stars'
                onMouseEnter={() => setHovered(prevState => ({...prevState, star2:true}))}
                onMouseLeave={() => setHovered(prevState => ({...prevState, star2:false}))}>
                <svg viewBox="0 0 15 15" stroke='gray' aria-hidden={true} xmlns="http://www.w3.org/2000/svg" className='w-[17px] h-[17px] md:w-[25px] md:h-[25px]'> <path d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z" fill="none" /></svg>
              </a>
              <a href='#'
                 className={`spr-icon spr-icon-star spr-icon-star-empty ${star3 ? 'spr-icon-star-hover' : ''}`}
                 data-value={'3'}
                 aria-label='3 of 5 stars'
                 onMouseEnter={() => setHovered(prevState => ({...prevState, star3:true}))}
                 onMouseLeave={() => setHovered(prevState => ({...prevState, star3:false}))}>
                <svg viewBox="0 0 15 15" stroke='gray' aria-hidden={true} xmlns="http://www.w3.org/2000/svg" className='w-[17px] h-[17px] md:w-[25px] md:h-[25px]'> <path d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z" fill="none" /></svg>
              </a>
              <a href='#'
                 className={`spr-icon spr-icon-star spr-icon-star-empty ${star4 ? 'spr-icon-star-hover' : ''}`}
                 data-value={'4'}
                 aria-label='4 of 5 stars'
                 onMouseEnter={() => setHovered(prevState => ({...prevState, star4:true}))}
                 onMouseLeave={() => setHovered(prevState => ({...prevState, star4:false}))}>
                 <svg viewBox="0 0 15 15" stroke='gray' aria-hidden={true} xmlns="http://www.w3.org/2000/svg" className='w-[17px] h-[17px] md:w-[25px] md:h-[25px]'> <path d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z" fill="none" /></svg>
              </a>
              <a href='#'
                 className={`spr-icon spr-icon-star spr-icon-star-empty ${star5 ? 'spr-icon-star-hover' : ''}`}
                 data-value={'5'}
                 aria-label='5 of 5 stars'
                 onMouseEnter={() => setHovered(prevState => ({...prevState, star5:true}))}
                 onMouseLeave={() => setHovered(prevState => ({...prevState, star5:false}))}>
                 <svg viewBox="0 0 15 15" stroke='gray' aria-hidden={true} xmlns="http://www.w3.org/2000/svg" className='w-[17px] h-[17px] md:w-[25px] md:h-[25px]'> <path d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z" fill="none" /></svg>
              </a>
            </div>
          </div>

          <div className='spr-form-review-title'>
            <label className='spr-form-label' htmlFor={`review_title_${product_id}`}>Review Title</label>
            <input className='spr-form-input' type='text' id={`review_title_${product_id}`} name='review[title]' placeholder='Give your review a title'/>
          </div>

          {/* // ! Handle character limit function later */}
          <div className='spr-form-review-body'>
            <label className='spr-form-label' htmlFor={`review_body_${product_id}`}>
                Body of Review
              <span role='status' aria-live='polite' aria-atomic='true'>
                <span className='spr-form-review-body-charactersremaining'>(This is dynamic,1500)</span>
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
                  placeholder='Write your comments here'>
              </textarea>
            </div>
          </div>
        </fieldset>

        <fieldset className='spr-form-actions'>
          <button className='spr-button uppercase flex' type='submit'>Submit Review</button>
        </fieldset>
      </form>
    </div>
  )
}