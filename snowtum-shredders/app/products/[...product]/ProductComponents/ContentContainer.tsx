'use client'
import ProductInfoContainer from "./ProductInfoContainer"
import ProductMain from "./ProductMain"
import ProductThumbs from "./ProductThumbs"

export default function ContentContainer() {
  return (
    <section className='content-container'>
      <div className='content'> {/* <---- Responsible for mx */}
        <div className='product-container'> {/* Responsible for top margin? */}
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