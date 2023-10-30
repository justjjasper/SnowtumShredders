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
  setThumbsSwiper: (newThumbsSwiper: null | SwiperCore) => void
}
export default function ProductMain( {images, name, thumbsSwiper, setThumbsSwiper}: ProductMainProps ) {
  return (
    <Swiper
      className='product-main h-[80vh] w-[40rem] border-2 border-secondary'
      modules= {[Navigation, FreeMode, Thumbs]}
      navigation={true}
      thumbs={{
        swiper:
          thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
      }}
      >
      {images.map((image:string, index:number) => {
        return (
          <SwiperSlide key={index}>
            <Image
              src={image}
              height={200}
              width={200}
              alt={name}
            />
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}