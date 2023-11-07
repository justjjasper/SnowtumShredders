interface ProductReviewsFormProps {
  product_id: number
}

export default function ProductReviewsForm ( {product_id}: ProductReviewsFormProps ) {

  return (
    // ! Be wary that there are solo value attr with each input in the form
    <div className='spr-form hidden' id={`form_${product_id}`}>
      {/* //TODO: Fill in server api later */}
      <form method='post' action='FILL THIS IN LATER' id={`new-review-form_${product_id}`} >
        {/* These two inputs are for structuring body data to send to the server with "HTML" post */}
        <input type='hidden' name='review[rating]'/>
        <input type='hidden' name='product_id' value={product_id}/>
        <span className='spr-form-title'>Write a review</span>

        <fieldset className='spr-form-contact'>
          <div className='spr-form-contact-name'>
            <label className='spr-form-label' htmlFor='review_author_1'>Name</label>
            <input className='spr-form-input' type='text' id={`review_author_${product_id}`} name='review[author]' placeholder='Enter your name'/>
          </div>
          <div className='spr-form-contact-email'>
            <label className='spr-form-label' htmlFor={`review_email_${product_id}`}>Email</label>
            <input className='spr-form-input' type='text' id={`review_email_${product_id}`} name='review[email]' placeholder='john.smith@example.com' />
          </div>
        </fieldset>

        <fieldset className='spr-form-review'>
          <div className='spr-form-review-rating'>
            <label className='spr-form-label' htmlFor='review[rating]'>Rating</label>
            {/* //! LOOK BACK AT THIS UGH Star Rating logic*/}
            <div className='spr-form-rating'></div>
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