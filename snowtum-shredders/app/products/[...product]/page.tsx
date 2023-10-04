// This page is dynamically routed, first param is the product type, second param is product name.
import Image from "next/image"

interface ProductParams {
  params: {
    product: string[]
  }
}

export default async function Product({ params }: ProductParams ) {
  const productType = params.product[0]
  const productName = params.product[1]
  console.log(params.product)

  try{
    const data = await fetch(`http://localhost:8000/${productType}/${productName}`)
    const res = await data.json()

    console.log(res)

    return (
      <div>
        {params.product[1]} snowboard is awesome.
        <Image src={`${res.snowboard_images[0]}`} alt='beaitful board' width={200} height={450}/>
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