'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import { circleXMarkSVG, leftVectorSVG, rightVectorSVG } from '@/app/Misc/Icons'
import Image from 'next/image'

interface ProductGalleryProps {
  images: string[];
  name: string
}
export default function ProductGallery( {images, name}: ProductGalleryProps ) {
  return (
    <div className='product-gallery  fixed z-20 top-0 left-0 w-full h-full overflow-hidden'>
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: '.product-gallery-nav-next',
          prevEl: '.product-gallery-nav-prev',
          disabledClass: 'swiper-button-disabled'
        }}
        loop={true}
      >
        {images.map((image, index) => {
          return (
            <SwiperSlide key={index} >
              <div className='product-gallery-item w-[1440px]'>
                <Image
                  src={image}
                  height={100}
                  width={100}
                  alt= {name}
                />
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
      <button>
        {circleXMarkSVG('black')}
      </button>
      <button className='product-gallery-nav-prev absolute left-[40px]' type='button'>
        {leftVectorSVG}
      </button>
      <button className='product-gallery-nav-next absolute right-[40px]' type='button'>
        {rightVectorSVG}
      </button>
    </div>
  )
}