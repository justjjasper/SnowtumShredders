import Image from "next/image"
import { magnifyingPlusSVG } from "@/app/Misc/Icons"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs } from 'swiper/modules'
import SwiperCore from 'swiper'
import { useContext } from "react"
import { ProductContext } from "./ContentContainer"

export default function ProductMain() {
  const { product, thumbsSwiper, setMainSwiper, toggleGallery, setToggleGallery } = useContext(ProductContext)
  const { images, name } = product

  return (
    <Swiper
      className='product-main w-[100%] border-0 border-secondary'
      modules= {[Thumbs]}
      thumbs={{
        swiper:
        thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
      }}
      onSwiper={setMainSwiper}
      onClick={() => setToggleGallery(!toggleGallery)}
      >
      <button className='product-main-magnify absolute z-2 top-[20px] right-[10px]'>
        {magnifyingPlusSVG}
      </button>
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
                priority={true}
                />
            </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}