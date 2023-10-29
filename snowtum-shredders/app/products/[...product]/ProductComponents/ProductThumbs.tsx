'use client'

export default function ProductThumbs() {
  return (
    <div className='product-thumbs relative w-[10rem] h-[10rem] border-2 border-secondary'>
      Product Thumbs
      <button className='product-thumb-nav-prev'></button>
        <div className='product-thumbs-slider'>
          <div className='swiper-wrapper'>
            {/* mapped out images*/}
            <div className='swiper-slide'>
              {/* <img/> */}
            </div>

          </div>
        </div>
      <button className='product-thumb-nav-next'></button>
    </div>
  )
}