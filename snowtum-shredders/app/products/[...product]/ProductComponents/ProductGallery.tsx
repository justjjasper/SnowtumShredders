'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, EffectFade } from 'swiper/modules'
import 'swiper/css'
import "swiper/css/effect-fade"
import { circleXMarkSVG, leftVectorSVG, rightVectorSVG } from '@/app/Misc/Icons'
import Image from 'next/image'

interface ProductGalleryProps {
  images: string[];
  name: string
}
export default function ProductGallery( {images, name}: ProductGalleryProps ) {
  return (
    <div className='product-gallery  bg-primary fixed top-0 left-0 w-full h-full overflow-hidden'>
      <Swiper
        modules={[Navigation, EffectFade]}
        navigation={{
          nextEl: '.product-gallery-nav-next',
          prevEl: '.product-gallery-nav-prev',
          disabledClass: 'swiper-button-disabled'
        }}
        loop={true}
        effect='fade'
        fadeEffect={{
          crossFade: true
        }}
        className=''
      >
        {images.map((image, index) => {
          return (
            <SwiperSlide key={index} >
              <div className='product-gallery-item w-full h-full'>
                <Image
                  src={image}
                  height={100}
                  width={100}
                  alt= {name}
                  className='h-auto'
                />
              </div>
            </SwiperSlide>
          )
        })}
        <button className='product-gallery-close'>
          {circleXMarkSVG('black')}
        </button>
        <button className='product-gallery-nav-prev absolute left-[40px]' type='button'>
          {leftVectorSVG}
        </button>
        <button className='product-gallery-nav-next absolute right-[40px]' type='button'>
          {rightVectorSVG}
        </button>
      </Swiper>
    </div>
  )
}