// This page is dynamically routed, first param is the product type, second param is product name.
import Image from "next/image"

interface ProductParams {
  params: {
    product: string[]
  }
}

// if productType is snowboard... conditional render that section
export default async function Product({ params }: ProductParams ) {
  const productType = params.product[0]
  const productName = params.product[1]


  try{
    const data = await fetch(`http://localhost:8000/${productType}/${productName}`)
    const product = await data.json()

    return (
      <div>
        {productName} snowboard is awesome.
        <Image src={`${product.images[0]}`} alt='beaitful board' width={200} height={450}/>
      </div>
    )
  } catch(err) {
    console.error('Error in fetching single product')

    return (
      <div>
        Sorry, there was an error with the page loading.
      </div>
    )
  }
}