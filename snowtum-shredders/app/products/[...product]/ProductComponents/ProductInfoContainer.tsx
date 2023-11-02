'use client'

import { useContext, useState } from 'react'
import { ProductContext } from './ContentContainer'
import { starFilledSVG } from '@/app/Misc/Icons'

export default function ProductInfoContainer() {
  const { product: { header_description, name, price, reviews, meta_data }, mainSwiper, thumbsSwiper  } = useContext(ProductContext)

  const handleSwipers = (index: number) => {
    mainSwiper?.slideTo(index)
    thumbsSwiper?.slideTo(index)
  }

  const [selectedSize, setSelectedSize] = useState<number | null>(null)

  return (
    <div className='product-info-container pt-6 border-2 border-secondary'>
      <div className='product-info flex flex-col'>
        <span className='font-bold'>{header_description}</span>
        <span className='text-5xl font-bold'>{name}</span>
        <span className='text-2xl font-bold'>${price}</span>
        <div className='product-info-review-container flex items-center'>
          <span className='flex'>
            {starFilledSVG}
            {starFilledSVG}
            {starFilledSVG}
            {starFilledSVG}
            {starFilledSVG}
            </span>
          <span className='underline tracking-tighter text-sm font-bold pl-2'>{reviews.length} reviews</span>
        </div>
        <div className='product-info-form'>
          {/* input hidden for now, responsible for identifying product SKU? */}
          <input type='hidden'/>
          <div className='product-info-sizes relative'>
            <div className='border-error hidden absolute border-[1px] rounded-lg'></div>
            {meta_data.map((item, index) => {
              const noStock = item.sku === 0

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
                  >
                  <input type='radio' className='hidden' name='Size'/>
                  <span className='text-[18px]'>{item.size}</span>
                </div>
              )
            })}
          </div>
          <span className='variant-select'>Please select a variant.</span>
        </div>
      </div>
    </div>
  )
}