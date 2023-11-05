'use client'

import { useContext, useState } from 'react'
import { ProductContext } from './ContentContainer'
import { starFilledSVG, cartSVG } from '@/app/Misc/Icons'

export default function ProductInfoContainer( {productType}: {productType: string}) {
  const { product: { id, header_description, name, price, reviews, meta_data }, mainSwiper, thumbsSwiper  } = useContext(ProductContext)

  const handleSwipers = (index: number) => {
    if (productType !== 'snowboard') return
    mainSwiper?.slideTo(index)
    thumbsSwiper?.slideTo(index)
  }

  const [selectedSize, setSelectedSize] = useState<number | null>(null)

  return (
    <div className='product-info-container pt-6 border-0'>
      <div className='product-info flex flex-col'>
        <span className='font-extrabold tracking-tighter'>{header_description || 'ACCESSORIES'}</span>
        <span className='text-5xl font-black mt-[15px]'>{name}</span>
        <span className='text-2xl font-bold mt-[20px]'>${price}</span>
        {reviews && <div className='product-info-review-container flex items-center my-[20px]'>
          <span className='flex'>
            {starFilledSVG}
            {starFilledSVG}
            {starFilledSVG}
            {starFilledSVG}
            {starFilledSVG}
            </span>
          <span className='underline tracking-tighter text-sm font-bold pl-2'>{reviews.length} reviews</span>
        </div> }
        <div className='product-info-form'>
          {/* input hidden for now, responsible for identifying product SKU? */}
          <input type='hidden'/>
          <div className='product-info-sizes relative mt-[20px]'>
            <div className='border-error hidden absolute border-[1px] rounded-lg'></div>
            {meta_data.map((item, index) => {
              const noStock = item.sku === 0

              // When creating a submit post, get the input value? and send that to the server only reason i can think of adding a data-for attached to a input radio
              return (
                <div className={`product-info-size relative text-center border-[1px] rounded-full px-3 py-2 hover:text-primary hover:bg-secondary hover:cursor-pointer ${noStock ? 'disabled-size opacity-50 text-gray-400' : ''}
                ${selectedSize === index ? 'bg-secondary text-primary' : ''}
                `}
                  key={index}
                  data-index={index}
                  onClick={() => {
                    handleSwipers(index)
                    setSelectedSize(index)

                  }}
                  data-for={id.toString()}
                  >
                  <input
                    className='invisible opacity-0 w-0 h-0'
                    type='radio'
                    name='Size'
                    value={item.size}
                    id={id.toString()}
                    />
                  <span className='text-[18px] cursor-pointer whitespace-nowrap'>{item.size}</span>
                </div>
              )
            })}
          </div>
          <span className='variant-select hidden'>Please select a variant.</span>
          <button className='add-to-cart flex justify-center items-center rounded-full font-bold w-full mt-[40px] py-[19px] gap-2 bg-secondary text-primary hover:underline'>
            <span className='uppercase'>Add to cart</span>
            {cartSVG('23')}
          </button>

        </div>
      </div>
    </div>
  )
}