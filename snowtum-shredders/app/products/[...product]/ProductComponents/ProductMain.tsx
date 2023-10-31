'use client'

import Image from "next/image"
import { magnifyingPlusSVG } from "@/app/Misc/Icons"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs } from 'swiper/modules'
import SwiperCore from 'swiper'
import { useState } from "react"

interface ProductMainProps {
  images: string[];
  name: string;
  thumbsSwiper: null | SwiperCore;
}
export default function ProductMain( {images, name, thumbsSwiper}: ProductMainProps ) {
  const [mainSwiper, setMainSwiper] = useState<SwiperCore>()

  const dummySwiper = () => {
    thumbsSwiper?.slideTo(1)
    mainSwiper?.slideTo(1)
  }
  return (
    <div className='w-[500px]'>
      <button onClick={dummySwiper}>Move slide</button>
    <Swiper
      className='product-main w-[100%] border-2 border-secondary'
      modules= {[Thumbs]}
      thumbs={{
        swiper:
        thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
      }}
      onSwiper={setMainSwiper}
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
      </div>
  )
}