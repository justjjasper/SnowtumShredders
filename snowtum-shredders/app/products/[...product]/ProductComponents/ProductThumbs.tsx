'use client'
import { upArrowVectorSVG,downArrowVectorSVG } from '@/app/Misc/Icons'
import Image from 'next/image'
import { useState } from 'react'
import { Navigation, FreeMode, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import SwiperCore from 'swiper'
import 'swiper/css'

interface ProductThumbsProps {
  images: string[];
  name: string;
  setThumbsSwiper: (newThumbsSwiper: null | SwiperCore) => void
}

export default function ProductThumbs( {images, name, setThumbsSwiper}: ProductThumbsProps ) {
  // console.log('[productThumbs] images:', images)
  const swiper = useSwiper()

  const [disablePrev, setDisablePrev] = useState<boolean>(false)
  const [disableNext, setDisableNext] = useState<boolean>(false)

  const handlePrev = () => {
    if (swiper !== null) {
      swiper.slidePrev()
    }
    console.log('what is disablePrev', disablePrev)
  }

  const handleNext = () => {
    if (swiper !== null) {
      swiper.slidePrev()
    }
  }

  return (
    <div className='product-thumbs relative flex flex-col items-center justify-evenly border-[1px] w-[100%]'>

      <button className={`product-thumb-nav-prev ${disablePrev ? 'cursor-not-allowed' : ''}`}
        onClick={handlePrev}
        disabled={disablePrev}>
        {upArrowVectorSVG(disablePrev)}
      </button>

      <Swiper
        className='product-thumbs-swiper h-[460px] border-[1px]'
        modules={[Navigation, FreeMode, Thumbs]}
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        navigation={{
          nextEl: '.product-thumb-nav-next',
          prevEl: '.product-thumb-nav-prev',
          disabledClass: 'swiper-button-disabled'
        }}
        direction='vertical'
        onSlideChange={(swiper) => {
          // Check is swiper is in first slide
          setDisablePrev(swiper.isBeginning)

          // Check if swiper is in last slide
          setDisableNext(swiper.isEnd)
        }}
        onSwiper={(swiper) => {
          console.log('onSwiper')
          setDisablePrev(swiper.isBeginning)
          setDisableNext(swiper.isEnd)
          setThumbsSwiper(swiper)
        }}
        >
          {images.map((image:string, index:number) => {
            return (
              <SwiperSlide  key={index} className='flex items-center justify-center border-[1px] rounded-lg cursor-pointer'>
                <Image
                  src={image}
                  height={100}
                  width={100}
                  alt={name}
                  className='block h-full object-contain'
                  />
              </SwiperSlide>
            )
          })}
      </Swiper>

      <button className={`product-thumb-nav-next ${disableNext ? 'cursor-not-allowed' : ''}`}
        onClick={handleNext}
        disabled={disableNext}>
          {downArrowVectorSVG(disableNext)}
      </button>
    </div>
  )
}






// const swiper = new Swiper('.product-thumbs-swiper',  {
//   // Configure modules
//   modules: [Navigation],

//   // Optional parameters
//   direction: 'vertical',

//   // Navigation Arrows
//   navigation: {
//     nextEl: '.product-thumb-nav-next',
//     prevEl: '.product-thumb-nav-prev'
//   },

//   slidesPerView: 3,
//   spaceBetween: 30
// })

// interface ProductThumbsProps {
//   images: string[];
//   name: string;
// }


// export default function ProductThumbs( {images, name}: ProductThumbsProps ) {
//   console.log('[productThumbs] images:', images)
//   useEffect(() => {

//     // // console.log('is document there', document)
//     // if (document) {
//     //   console.log('window check?', document)
//     //   swiper.navigation.init()
//     // }
//   })
//   return (
//     <div className='product-thumbs swiper product-thumbs-swiper relative flex flex-col items-center border-2 border-secondary'>
//       Product Thumbs
//       <button className='product-thumb-nav-prev' onClick={() => swiper.navigation.prevEl}>{upArrowVectorSVG}</button>
//         <div className='product-thumbs-slider'>
//           <div className='swiper-wrapper'>
//             {images.map((image:string, index:number) => {
//               return (
//                 <div  key={index} className='swiper-slide'>
//                   <Image
//                     src={image}
//                     height={100}
//                     width={100}
//                     alt={name}
//                     />
//                 </div>
//               )
//             })}
//           </div>
//         </div>
//       <button className='product-thumb-nav-next' onClick={() => swiper.navigation.nextEl}>{downArrowVectorSVG}</button>
//     </div>
//   )
// }