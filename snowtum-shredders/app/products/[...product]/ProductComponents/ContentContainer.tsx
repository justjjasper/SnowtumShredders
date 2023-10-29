'use client'
import './Product.css'
import ProductInfoContainer from "./ProductInfoContainer"
import ProductMain from "./ProductMain"
import ProductThumbs from "./ProductThumbs"
import { useState, useEffect } from 'react'

interface ContentContainerProps {
  images: string[];
}

// Top Level Components, contains props and state for Carousels(Product Thumbs/Product Main)
export default function ContentContainer( {images}: ContentContainerProps ) {
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
          <div className='product-content'>
            <ProductThumbs images={images} />
            <ProductMain/>
            <ProductInfoContainer/>
          </div>
        </div>
      </div>
    </section>
  )
}