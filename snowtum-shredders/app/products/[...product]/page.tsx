// This page is dynamically routed, first param is the product type, second param is product name.
import Image from "next/image"
import { serverURL } from "@/app/config"

// May use unions to have product type be string | string[]
interface ProductParams {
  params: {
    product: string[]
  }
}

// if productType is snowboard... conditional render that section
export default async function Product({ params }: ProductParams ) {
  // Get dynamic route parameters for productType and productName
  const productType = params.product[0]
  const productName = params.product[1]
  // console.log('what are products', params)

  try{
    // Query from database using productType & productName
    const data = await fetch(`${serverURL}/${productType}/${productName}`)
    const product = await data.json()
    console.log('what is product[roduct page]', product)
    return (
      <main className='flex flex-col relative bottom-[100px] z-20 font-calibre'>
        {productType === 'snowboard' &&
          <section className='flex justify-center items-center'>
            <Image
              src={product.image}
              width={500}
              height={500}
              alt={`${product.name} Hero Banner`}
              priority={true}
              className='w-full h-[35em]'
            />
            <span className='flex absolute text-[6rem] font-bold tracking-tighter text-primary'>{product.name}</span>
          </section>}
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




// return (
//   <div className={`${productType === 'snowboard' ? 'bottom-[100px] z-20' : ''} relative `}>
//     {productName} snowboard is awesome.
//     <Image src={`${product.images[0]}`} alt='beaitful board' width={200} height={450} priority={true}/>
//   </div>
// )