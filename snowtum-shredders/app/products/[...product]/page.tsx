// This page is dynamically routed, first param is the product type, second param is product name.
import Image from "next/image"
import { serverURL } from "@/app/config"
import ContentContainer from "./ProductComponents/ContentContainer"
import ProductTech from "./ProductComponents/ProductTech"
import ProductAccessoryDetail from "./ProductComponents/ProductAccessoryDetail"
import ProductReviews from "./ProductComponents/ProductReviews"

// May use unions to have product type be string | string[]
interface ProductParams {
  params: {
    product: string[]
  },
  searchParams: {
    page: string
  }
}

export const calcAvgStarRating = (reviews: ReviewType[]) => {
  if (reviews.length === 0) {
    return 0
  }

  const totalRating = reviews.reduce((total, review) => total += review.snowboard_review_rating, 0)

  return totalRating / reviews.length
}

// if productType is snowboard... conditional render that section
export default async function Product({ params, searchParams }: ProductParams ) {
  // Get dynamic route parameters for productType and productName
  const productType = params.product[0]
  const productName = params.product[1]
  const { page } = searchParams

  try{
    // Query from database using productType & productName
    const data = await fetch(`${serverURL}/${productType}/${productName}`, {
      cache: 'no-store'
    })
    const product = await data.json()

    // console.log('what is product[roduct page]', product.reviews)
    return (
      <main className={`flex flex-col relative bottom-[100px] font-calibre ${product.flex ? '' : 'mt-[100px]'}`}>
        {productType === 'snowboard' &&
          <section className='flex justify-center items-center mt-[95px] sm:mt-0'>
            <Image
              src={product.image}
              width={500}
              height={500}
              alt={`${product.name} Hero Banner`}
              priority={true}
              className='w-full lg:h-[35em]'
            />
            <span className='flex absolute text-3xl lg:text-[6rem] font-bold tracking-tighter text-primary text-center leading-[6rem]'>{product.name}</span>
          </section>}

          <main className='main-content'>
            <ContentContainer product={product} productType={productType}/>
            <section className='product-detail-container hidden'></section>
            <section className='product-reviews-container hidden'></section>
            { product.flex && <ProductTech product={product}/> }
            { product.description && <ProductAccessoryDetail product={product}/> }
            { product.reviews && <ProductReviews reviews={product.reviews} product_id={product.id} page={page} productName={productName}/>}
          </main>
      </main>
    )
  } catch(err) {
    console.error('Error in fetching single product', err)

    return (
      <div>
        Sorry, there was an error with the page loading.
      </div>
    )
  }
}