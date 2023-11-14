'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import { leftVectorSVG, rightVectorSVG } from '@/app/Misc/Icons'
import Image from 'next/image'

interface ProductGalleryProps {
  images: string[];
  name: string
}
export default function ProductGallery( {images, name}: ProductGalleryProps ) {
  return (
    <div className='product-gallery invisible opacity-0 pointer-events-none fixed z-20 top-0 left-0 w-full h-full overflow-hidden'>
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: '.product-gallery-nav-next',
          prevEl: '.product-gallery-nav-prev',
          disabledClass: 'swiper-button-disabled'
        }}
      >
        {images.map((image, index) => {
          return (
            <SwiperSlide key={index}>
              <Image
                src={image}
                height={100}
                width={100}
                alt= {name}
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
      <button className='product-gallery-nav-prev' type='button'>
        {leftVectorSVG}
      </button>
      <button className='product-gallery-nav-next' type='button'>
        {rightVectorSVG}
      </button>
    </div>
  )
}