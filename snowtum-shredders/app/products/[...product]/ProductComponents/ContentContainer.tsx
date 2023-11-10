'use client'
import './Product.css'
import ProductInfoContainer from "./ProductInfoContainer"
import ProductMain from "./ProductMain"
import ProductThumbs from "./ProductThumbs"
import SwiperCore from 'swiper'
import { useState, createContext } from 'react'

interface ContentContainerProps {
  product: ProductType;
  productType: string;
}

// Create types for Product Context
interface ProductContextData {
  product: ProductType
  thumbsSwiper: null | SwiperCore;
  setThumbsSwiper: (newThumbsSwiper: null | SwiperCore) => void
  mainSwiper: null | SwiperCore;
  setMainSwiper: (newMainSwiper: null | SwiperCore) => void
}

// Create a context provider to manage data being passed to child components
export const ProductContext = createContext<ProductContextData>({
  product: {
    id: 0,
    name: '',
    header_description: '',
    price: '',
    shape: '',
    sidecut: '',
    flex: '',
    rider_type: '',
    tech_story: '',
    camber_type: '',
    camber_description: '',
    camber_image: '',
    images: [],
    reviews: [],
    meta_data: [],
    video: '',
    description: ''
  },
  thumbsSwiper: null,
  setThumbsSwiper: () => {},
  mainSwiper: null,
  setMainSwiper: () => {}
})

// Top Level Components, contains props and state for Carousels(Product Thumbs/Product Main)
// Possibly have thumbsSwipper state here, and passed as props to ProductThumbs/ProductMain
export default function ContentContainer( {product, productType}: ContentContainerProps ) {
  // Declare swiper instances from ContentContainer level, manages swiper methods such as swiper.slideTo(index)
  const [thumbsSwiper, setThumbsSwiper] = useState<null | SwiperCore>(null)
  const [mainSwiper, setMainSwiper] = useState<null | SwiperCore>(null)

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

  // Values for Context Provider
  const store = {
    product,
    thumbsSwiper,
    setThumbsSwiper,
    mainSwiper,
    setMainSwiper
  }

  return (
    <section className='content-container-product-main max-w-[1920px]'> {/* <---- Responsible for max width of 1920px */}
      <div className='content-wider lg:px-16'> {/* <---- Responsible for px */}
        <div className='product-container mt-[58px]'> {/* Responsible for top margin? */}
        {/* Grid layout grid-template-areas "thumb main info" grid-template-columns(.3fr 1fr 400px) */}
        <ProductContext.Provider value={store}>

          <div className='product-content w-full'>
            {/* Uses Swiper.js for carousel */}
            <ProductThumbs/>
             {/* Uses Swiper.js for carousel */}
            <ProductMain/>
            <ProductInfoContainer productType={productType} />
          </div>

        </ProductContext.Provider>
        </div>
      </div>
    </section>
  )
}