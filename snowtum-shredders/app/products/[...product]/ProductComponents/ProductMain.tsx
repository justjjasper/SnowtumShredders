'use client'

import Image from "next/image"
import { magnifyingPlusSVG } from "@/app/Misc/Icons"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, FreeMode, Thumbs } from 'swiper/modules'
import SwiperCore from 'swiper'

interface ProductMainProps {
  images: string[];
  name: string;
  thumbsSwiper: null | SwiperCore;
}
export default function ProductMain( {images, name, thumbsSwiper}: ProductMainProps ) {
  return (
    <Swiper
      className='product-main h-[80vh] w-[100%] border-2 border-secondary'
      modules= {[FreeMode, Thumbs]}
      thumbs={{
        swiper:
          thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
      }}
      >
      {images.map((image:string, index:number) => {
        return (
          <SwiperSlide key={index} className='h-[100%]'>
            <Image
              src={image}
              height={200}
              width={200}
              alt={name}
              className='h-full w-auto'
              />
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}