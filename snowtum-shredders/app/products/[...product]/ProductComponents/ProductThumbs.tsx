'use client'
import { upArrowVectorSVG,downArrowVectorSVG } from '@/app/Misc/Icons'

interface ProductThumbsProps {
  images: string[];
}

export default function ProductThumbs( {images}: ProductThumbsProps ) {
  console.log('[productThumbs] images:', images)
  return (
    <div className='product-thumbs swiper relative flex flex-col items-center h-[10rem] border-2 border-secondary'>
      Product Thumbs
      <button className='product-thumb-nav-prev'>{upArrowVectorSVG}</button>
        <div className='product-thumbs-slider'>
          <div className='swiper-wrapper'>
            {/* mapped out images*/}
            <div className='swiper-slide'>
              {/* <img/> */}
            </div>

          </div>
        </div>
      <button className='product-thumb-nav-next'>{downArrowVectorSVG}</button>
    </div>
  )
}