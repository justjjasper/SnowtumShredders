'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, EffectFade } from 'swiper/modules'
import 'swiper/css'
import "swiper/css/effect-fade"
import { circleXMarkSVG, leftVectorSVG, rightVectorSVG } from '@/app/Misc/Icons'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface ProductGalleryProps {
  images: string[];
  name: string;
  toggleGallery: boolean;
  setToggleGallery: (prevState: boolean) => void
}
export default function ProductGallery( {images, name, toggleGallery, setToggleGallery}: ProductGalleryProps ) {
  const [transformStyle, setTransformStyle] = useState('translate(0, 0)');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const y = (e.clientY / window.innerHeight) * -400; // Multiply by -400 to get negative Y translation
      const transform = `translate(0, ${y}px)`;
      setTransformStyle(transform);
    };

    document.addEventListener('mousemove', handleMouseMove);

    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    const handleResize = () => {
      if (mediaQuery.matches) {
        document.addEventListener('mousemove', handleMouseMove);
      } else {
        document.removeEventListener('mousemove', handleMouseMove);
        setTransformStyle('translate(0, 0)')
      }
    };

    // Initial setup
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array to run the effect once


  return (
    <div className={`product-gallery ${toggleGallery ? '' : 'invisible opacity-0 pointer-events-none'} bg-primary fixed top-0 left-0 w-screen h-screen overflow-hidden z-50`}>
      <Swiper
        modules={[Navigation, EffectFade]}
        navigation={{
          nextEl: '.product-gallery-nav-next',
          prevEl: '.product-gallery-nav-prev',
          disabledClass: '.swiper-button-disabled'
        }}
        loop={true}
        effect='fade'
        fadeEffect={{
          crossFade: true
        }}
        className='w-full h-full'
      >
        {images.map((image, index) => {
          return (
            <SwiperSlide key={index} className=''>
              <div className='product-gallery-item w-full h-full flex justify-center'>
                <Image
                  src={image}
                  height={200}
                  width={200}
                  alt= {name}
                  className='mx-auto h-[500px] w-[300px] sm:w-[50%] sm:h-auto lg:w-[50%] lg:h-[150%]'
                  style={{ transform: transformStyle }}
                />
              </div>
            </SwiperSlide>
          )
        })}
        <button className='product-gallery-close absolute top-[50px] right-[50px] z-2' onClick={() => setToggleGallery(!toggleGallery)}>
          {circleXMarkSVG}
        </button>
        <button className='product-gallery-nav-prev absolute top-[50%] left-[50px] z-2 translate-y-[-50%]' type='button'>
          {leftVectorSVG}
        </button>
        <button className='product-gallery-nav-next absolute top-[50%] right-[50px] z-2 translate-y-[-50%]' type='button'>
          {rightVectorSVG}
        </button>
      </Swiper>
    </div>
  )
}