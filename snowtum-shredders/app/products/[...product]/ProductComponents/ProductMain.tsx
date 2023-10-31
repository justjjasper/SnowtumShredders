'use client'

import Image from "next/image"
import { magnifyingPlusSVG } from "@/app/Misc/Icons"
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Thumbs } from 'swiper/modules'
import SwiperCore from 'swiper'

interface ProductMainProps {
  images: string[];
  name: string;
  thumbsSwiper: null | SwiperCore;
}
export default function ProductMain( {images, name, thumbsSwiper}: ProductMainProps ) {
  return (
    <Swiper
      className='product-main w-[100%] border-2 border-secondary'
      modules= {[FreeMode, Thumbs]}
      thumbs={{
        swiper:
          thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
      }}
      >

      {images.map((image:string, index:number) => {
        return (
          <SwiperSlide key={index} className='h-[100%] cursor-pointer'>
            {/* Resposnsible for centering Image, hard to css with Prebuilt SwiperSlide Components*/}
            <div className='swiper-slide-container flex justify-center items-center  border-red-600'>
              <Image
                src={image}
                height={200}
                width={200}
                alt={name}
                className='h-[530px] w-auto'
                />
            </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}