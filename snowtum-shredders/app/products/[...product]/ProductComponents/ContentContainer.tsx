'use client'
import './Product.css'
import ProductInfoContainer from "./ProductInfoContainer"
import ProductMain from "./ProductMain"
import ProductThumbs from "./ProductThumbs"
import SwiperCore from 'swiper'
import { useState, useEffect } from 'react'

interface ContentContainerProps {
  images: string[];
  name: string
}

// Top Level Components, contains props and state for Carousels(Product Thumbs/Product Main)
// Possibly have thumbsSwipper state here, and passed as props to ProductThumbs/ProductMain
export default function ContentContainer( {images, name}: ContentContainerProps ) {
  const [thumbsSwiper, setThumbsSwiper] = useState<null | SwiperCore>(null)

  const [currIndex, setCurrIndex] = useState<number>(0)

  const handleNext = () => {
    setCurrIndex((prevIndex) => prevIndex + 1)
  }

  const handlePrevious = () => {
    setCurrIndex((prevIndex) => prevIndex - 1)
  }

  // Desktop: Selected Image during [ProductThumbs]
  // Mobile: Selected Dot during [ProductMain- className='swiper pagination']
  const handleSelectedClick = (index: number) => {
    setCurrIndex(index)
  }

  return (
    <section className='content-container'>
      <div className='content lg:px-16'> {/* <---- Responsible for mx */}
        <div className='product-container mt-[58px]'> {/* Responsible for top margin? */}
        {/* Grid layout grid-template-areas "thumb main info" grid-template-columns(.3fr 1fr 400px) */}
          <div className='product-content w-full'>
            {/* Uses Swiper.js for carousel */}
            <ProductThumbs images={images} name={name} setThumbsSwiper={setThumbsSwiper}/>
             {/* Uses Swiper.js for carousel */}
            <ProductMain images={images} name={name} thumbsSwiper={thumbsSwiper}/>
            <ProductInfoContainer/>
          </div>
        </div>
      </div>
    </section>
  )
}