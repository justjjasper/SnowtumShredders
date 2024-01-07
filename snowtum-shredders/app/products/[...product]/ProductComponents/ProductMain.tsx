import Image from "next/image"
import { leftVectorSVG, magnifyingPlusSVG, rightVectorSVG } from "@/app/Misc/Icons"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs, Navigation, Pagination } from 'swiper/modules'
import { CSSProperties, useContext } from "react"
import { ProductContext } from "./ContentContainer"
import 'swiper/css/pagination';

export default function ProductMain() {
  const { product, thumbsSwiper, setMainSwiper, toggleGallery, setToggleGallery } = useContext(ProductContext)
  const { images, name } = product

  type SwiperStyle = {
    "--swiper-pagination-color": string;
    "--swiper-pagination-bullet-inactive-color": string;
    "--swiper-pagination-bullet-inactive-opacity": string;
    "--swiper-pagination-bullet-size": string;
    "--swiper-pagination-bullet-horizontal-gap": string;
    "--swiper-pagination-pagination-top": string;
  };

  const swiperStyle: SwiperStyle = {
    "--swiper-pagination-color": "black",
    "--swiper-pagination-bullet-inactive-color": "white",
    "--swiper-pagination-bullet-inactive-opacity": "1",
    "--swiper-pagination-bullet-size": "12px",
    "--swiper-pagination-bullet-horizontal-gap": "6px",
    "--swiper-pagination-pagination-top": "100px",
  };

  return (
    <Swiper
      style={swiperStyle as CSSProperties}
      className='product-main w-[100%] h-[480px] sm:h-[725px] lg:h-auto'
      modules= {[Thumbs, Navigation, Pagination]}
      thumbs={{
        swiper:
        thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
      }}
      navigation={{
        nextEl: '.product-main-nav-next',
        prevEl: '.product-main-nav-prev',
        disabledClass: 'swiper-button-disabled' // <-- Disabled default navigation arrows
      }}
      pagination={{ clickable: true }}
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
                className='h-[400px] w-[240px] sm:h-[680px] sm:w-[450px] lg:h-[530px] lg:w-auto'
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
    </Swiper>
  )
}