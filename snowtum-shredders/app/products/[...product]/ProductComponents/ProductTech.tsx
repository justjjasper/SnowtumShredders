import { ProductType } from "@/app/types"
import React from "react"

interface ProductTechProps {
  product: ProductType
}

export default function ProductTech( {product}: ProductTechProps ) {
  const { name, shape, sidecut, flex, rider_type, video } = product

  const flexValue = flex.split(' ')[1]
  console.log(flexValue)
  return (
    <section className='content-container-product-tech max-width-screen-[1920px]'> {/* <---- Responsible for max width of 1920px */}
      <div className='content-wider lg:px-16'> {/* Responsible for px */}
        <div className='product-tech py-[87px] px-[85px] rounded-[32px] border-[1px] mt-[40px]'>

          <div className='product-tech-left border-2 w-full h-auto'>
            <div className='product-tech-specs flex flex-col gap-7'>
              <div className='spec flex flex-col'>
                <span className='spec-type uppercase'>shape</span>
                <span className='spec-value'>{shape}</span>
              </div>
              <div className='spec flex flex-col'>
                <span className='spec-type uppercase'>sidecut</span>
                <span className='spec-value'>{sidecut}</span>
              </div>
              <div className='spec flex flex-col'>
                <span className='spec-type uppercase'>flex</span>
                <span className='spec-value'>{flex}</span>
                <div className='spec-level'>
                  <div className='spec-dot' style={{'--dot-position': flexValue} as React.CSSProperties}></div>
                  <div className='spec-line'></div>
                  <div className='spec-line'></div>
                  <div className='spec-line'></div>
                  <div className='spec-line'></div>
                  <div className='spec-line'></div>
                  <div className='spec-line'></div>
                  <div className='spec-line'></div>
                  <div className='spec-line'></div>
                  <div className='spec-line'></div>
                </div>
              </div>
              <div className='spec flex flex-col'>
                <span className='spec-type uppercase'>rider type</span>
                <span className='spec-value'>{rider_type}</span>
              </div>
            </div>
          </div>
          <div className='product-tech-right border-2 w-full h-auto'> tech right</div>

          <div className='product-tech-video w-full h-auto'>
            <iframe id={video} className=''allowFullScreen={true} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" title={`Player for CAPiTA Snowboards | ${name}`} width="100%" height="100%" src={`${video}?autoplay=0;controls=0;disablekb=1;playsinline=1;cc_load_policy=0;cc_lang_pref=auto;`}>
            </iframe>
          </div>
        </div>
      </div>
    </section>
  )
}
