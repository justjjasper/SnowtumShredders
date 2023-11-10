'use client'

import { useState } from "react"

interface FormStarsProps {
  rating: number;
  setRating: (starRating: number) => void
}

export default function FormStars( {rating, setRating}: FormStarsProps) {
  // Controls hover state for respective star
  const [hovered, setHovered] = useState<HoveredType>({
    star1: false,
    star2: false,
    star3: false,
    star4: false,
    star5: false
  })

  const { star1, star2, star3, star4, star5} = hovered

  // Manages the css for each respective star when a RATING is selected, returns a boolean
  const checkRating = (currRating: number) => {
    return rating !==0 && rating >= currRating ? true : false
  }

  const selectRating = (e: React.MouseEvent<HTMLAnchorElement>, starRating: number) => {
    e.preventDefault()
    setRating(starRating)
  }

  return (
    <div className='spr-form-review-rating'>
      <label className='spr-form-label' htmlFor='review[rating]'>Rating</label>
      <div className='spr-form-input spr-starrating flex gap-1'>
        {/* //TODO each a tag contains an onClick func */}
        <a href='#'
            className={`spr-icon spr-icon-star ${star1 ? 'spr-icon-star-underline' : ''} ${checkRating(1) ? 'spr-icon-star-not-empty' : ''}`}
            data-value={'1'}
            aria-label='1 of 5 stars'
            onMouseEnter={() => setHovered(prevState => ({...prevState, star1:true}))}
            onMouseLeave={() => setHovered(prevState => ({...prevState, star1:false}))}
            onClick={(e) => selectRating(e,1)}>
            <svg viewBox="0 0 15 15" stroke={checkRating(1) ? 'gold' : 'gray'} aria-hidden={true} xmlns="http://www.w3.org/2000/svg" className='w-[17px] h-[17px] md:w-[25px] md:h-[25px]'> <path d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z" fill={`${checkRating(1) ? 'gold' : star1 || star2 || star3 || star4 || star5 ? 'gray' : 'none'}`} /></svg>
        </a>
        <a href='#'
          className={`spr-icon spr-icon-star ${star2 ? 'spr-icon-star-underline' : ''} ${checkRating(2) ? 'spr-icon-star-not-empty' : ''}`}
          data-value={'2'}
          aria-label='2 of 5 stars'
          onMouseEnter={() => setHovered(prevState => ({...prevState, star2:true}))}
          onMouseLeave={() => setHovered(prevState => ({...prevState, star2:false}))}
          onClick={(e) => selectRating(e,2)}>
          <svg viewBox="0 0 15 15" stroke={checkRating(2) ? 'gold' : 'gray'} aria-hidden={true} xmlns="http://www.w3.org/2000/svg" className='w-[17px] h-[17px] md:w-[25px] md:h-[25px]'> <path d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z" fill={`${checkRating(2) ? 'gold' : star2 || star3 || star4 || star5 ? 'gray' : 'none'}`} /></svg>
        </a>
        <a href='#'
            className={`spr-icon spr-icon-star ${star3 ? 'spr-icon-star-underline' : ''} ${checkRating(3) ? 'spr-icon-star-not-empty' : ''}`}
            data-value={'3'}
            aria-label='3 of 5 stars'
            onMouseEnter={() => setHovered(prevState => ({...prevState, star3:true}))}
            onMouseLeave={() => setHovered(prevState => ({...prevState, star3:false}))}
            onClick={(e) => selectRating(e,3)}>
          <svg viewBox="0 0 15 15" stroke={checkRating(3) ? 'gold' : 'gray'} aria-hidden={true} xmlns="http://www.w3.org/2000/svg" className='w-[17px] h-[17px] md:w-[25px] md:h-[25px]'> <path d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z" fill={`${checkRating(3) ? 'gold' : star3 || star4 || star5 ? 'gray' : 'none'}`} /></svg>
        </a>
        <a href='#'
            className={`spr-icon spr-icon-star ${star4 ? 'spr-icon-star-underline' : ''} ${checkRating(4) ? 'spr-icon-star-not-empty' : ''}`}
            data-value={'4'}
            aria-label='4 of 5 stars'
            onMouseEnter={() => setHovered(prevState => ({...prevState, star4:true}))}
            onMouseLeave={() => setHovered(prevState => ({...prevState, star4:false}))}
            onClick={(e) => selectRating(e,4)}>
            <svg viewBox="0 0 15 15" stroke={checkRating(4) ? 'gold' : 'gray'} aria-hidden={true} xmlns="http://www.w3.org/2000/svg" className='w-[17px] h-[17px] md:w-[25px] md:h-[25px]'> <path d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z" fill={`${checkRating(4) ? 'gold' : star4 || star5 ? 'gray' : 'none'}`} /></svg>
        </a>
        <a href='#'
            className={`spr-icon spr-icon-star ${star5 ? 'spr-icon-star-underline' : ''} ${checkRating(5) ? 'spr-icon-star-not-empty' : ''}`}
            data-value={'5'}
            aria-label='5 of 5 stars'
            onMouseEnter={() => setHovered(prevState => ({...prevState, star5:true}))}
            onMouseLeave={() => setHovered(prevState => ({...prevState, star5:false}))}
            onClick={(e) => selectRating(e,5)}>
            <svg viewBox="0 0 15 15" stroke={checkRating(5) ? 'gold' : 'gray'} aria-hidden={true} xmlns="http://www.w3.org/2000/svg" className='w-[17px] h-[17px] md:w-[25px] md:h-[25px]'> <path d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z" fill={`${checkRating(5) ? 'gold' : star5 ? 'gray' : 'none'}`} /></svg>
        </a>
      </div>
    </div>
  )
}