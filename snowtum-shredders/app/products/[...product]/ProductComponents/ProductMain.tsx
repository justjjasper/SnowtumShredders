import Image from "next/image"
import { leftVectorSVG, magnifyingPlusSVG, rightVectorSVG } from "@/app/Misc/Icons"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs } from 'swiper/modules'
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
      <button className='product-main-magnify absolute top-[20px] right-[10px] z-50'
        onClick={() => setToggleGallery(!toggleGallery)}>
        {magnifyingPlusSVG}
      </button>
      {images.map((image:string, index:number) => {
        return (
          <SwiperSlide key={index} className='h-[100%] cursor-pointer'>
            {/* Resposnsible for centering Image, hard to css with Prebuilt SwiperSlide Components*/}
            <div className='swiper-slide-container flex justify-center items-center border-red-600 z-10'>
              <Image
                src={image}
                height={200}
                width={200}
                alt={name}
                className='h-[700px] lg:h-[530px] w-auto'
                priority={true}
                />
            </div>
          </SwiperSlide>
        )
      })}
      <button className='product-main-nav-prev lg:hidden z-50 absolute left-0 top-[50%]' type='button'>
        {leftVectorSVG}
      </button>
      <button className='product-main-nav-next lg:hidden z-50 absolute right-0 top-[50%]' type='button'>
       {rightVectorSVG}
      </button>
      {/* Insert pagination library here */}
    </Swiper>
  )
}