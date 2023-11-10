import Image from "next/image"
import React from "react"

interface ProductTechProps {
  product: ProductType
}

export default function ProductTech( {product}: ProductTechProps ) {
  const { name, shape, sidecut, flex, rider_type, tech_story, camber_type, camber_description, camber_image, video } = product

  const flexValue = flex.split(' ')[1]

  return (
    <section className='content-container-product-tech max-w-[1920px]'> {/* <---- Responsible for max width of 1920px */}
      <div className='content-wider lg:px-16'> {/* Responsible for px */}
        <div className='product-tech py-[87px] px-[85px] rounded-[32px] border-[1px] mt-[40px]'> {/* Responsible for mt */}

          <div className='product-tech-left w-full h-auto'>
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
              <div className='product-tech-story '>
                <div className='product-tech-subtitle uppercase'>camber</div>
                <div className='product-tech-title'>{camber_type}</div>
                <div className='product-tech-text mt-[3px] text-[15px]'>{camber_description}</div>
            </div>
            </div>
          </div>

          <div className='product-tech-right w-full h-auto'>
            <div className='product-tech-story'>
              <div className='product-tech-subtitle uppercase'>tech story</div>
              <div className='product-tech-title mb-[15px]'>{name}</div>
              <div className='product-tech-text text-[15px]'>
              {tech_story.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index !== tech_story.split('\n').length - 1 && (
                    <React.Fragment>
                      <br />
                      <br />
                    </React.Fragment>
                  )}
                </React.Fragment>
              ))}
              </div>
            </div>

            <div className='product-tech-image mt-[30px]'>
              <Image
                src={camber_image}
                height={200}
                width={200}
                alt={name}
                className='h-auto w-[100%]'
              />
            </div>
          </div>

          <div className='product-tech-video w-full h-auto'>
            <iframe id={video} className=''allowFullScreen={true} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" title={`Player for CAPiTA Snowboards | ${name}`} width="100%" height="100%" src={`${video}?autoplay=0;controls=0;disablekb=1;playsinline=1;cc_load_policy=0;cc_lang_pref=auto;`}>
            </iframe>
          </div>
        </div>
      </div>
    </section>
  )
}
