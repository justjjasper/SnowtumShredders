'use client'
import './Product.css'
import ProductInfoContainer from "./ProductInfoContainer"
import ProductMain from "./ProductMain"
import ProductThumbs from "./ProductThumbs"

export default function ContentContainer() {
  return (
    <section className='content-container'>
      <div className='content'> {/* <---- Responsible for mx */}
        <div className='product-container'> {/* Responsible for top margin? */}

          {/* Grid layout grid-template-areas "thumb main info" grid-template-columns(.3fr 1fr 400px) */}
          <div className='product-content'>
            <ProductThumbs/>
            <ProductMain/>
            <ProductInfoContainer/>
          </div>
        </div>
      </div>
    </section>
  )
}