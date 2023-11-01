'use client'

import { useContext } from 'react'
import { ProductContext } from './ContentContainer'
import { starFilledSVG } from '@/app/Misc/Icons'

export default function ProductInfoContainer() {
  const { product: { header_description, name, price, reviews, meta_data }, mainSwiper, thumbsSwiper  } = useContext(ProductContext)

  const handleSwipers = (index: number) => {
    mainSwiper?.slideTo(index)
    thumbsSwiper?.slideTo(index)
  }

  return (
    <div className='product-info-container pt-6 border-2 border-secondary'>
      <div className='product-info flex flex-col'>
        <span className='font-bold'>{header_description}</span>
        <span>{name}</span>
        <span>${price}</span>
        <div className='product-info-review-container flex items-center'>
          <span className='flex'>
            {starFilledSVG}
            {starFilledSVG}
            {starFilledSVG}
            {starFilledSVG}
            {starFilledSVG}
            </span>
          <span className=''>{reviews.length} reviews</span>
        </div>
        <div className='product-info-form'>
          {/* input hidden for now, responsible for identifying product SKU? */}
          <input type='hidden'/>
          <div className='product-info-sizes'>
            {meta_data.map((item, index) => {
              const noStock = item.sku === 0

              return (
                <div className={`product-info-size relative text-center border-[1px] rounded-full px-3 py-2 hover:text-primary hover:bg-secondary hover:cursor-pointer ${noStock ? 'disabled-size opacity-50 text-gray-400' : ''}`}
                  key={index}
                  data-index={index}
                  onClick={() => handleSwipers(index)}
                  >
                  <input type='radio' className='hidden' name='Size'/>
                  <span className='text-[18px]'>{item.size}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}