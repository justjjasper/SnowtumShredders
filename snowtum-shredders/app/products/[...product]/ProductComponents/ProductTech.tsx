import { ProductType } from "@/app/types"

interface ProductTechProps {
  product: ProductType
}

export default function ProductTech( {product}: ProductTechProps ) {
  return (
    <section className='content-container max-width-screen-[1920px]'> {/* <---- Responsible for max width of 1920px */}
      <div className='content-wider lg:px-16-'> {/* Responsible for px */}

      </div>
    </section>
  )
}