import { ProductType } from "@/app/types"

interface ProductTechProps {
  product: ProductType
}

{/* <iframe id={video} allowFullScreen={true} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" title="Player for CAPiTA Snowboards | SUPER D.O.A." width="100%" height="100%" src="https://www.youtube.com/embed/I7MG_twuLBA?autoplay=0;controls=0;disablekb=1;playsinline=1;cc_load_policy=0;cc_lang_pref=auto;"> </iframe> */}

export default function ProductTech( {product}: ProductTechProps ) {
  const { name, video } = product

  return (
    <section className='content-container max-width-screen-[1920px]'> {/* <---- Responsible for max width of 1920px */}
      <div className='content-wider lg:px-16'> {/* Responsible for px */}
        <div className='product-tech py-[87px] px-[85px] rounded-[32px] border-[1px]'>
          <div className='product-tech-left border-2 w-full h-auto'>tech left</div>
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
