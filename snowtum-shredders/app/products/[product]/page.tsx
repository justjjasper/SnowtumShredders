
import Image from "next/image";

interface ProductParams {
  params: {
    product: string
  }
}
export default async function Product({ params }: ProductParams ) {

  console.log(params.product)


    const data = await fetch(`http://localhost:8000/snowboard/${params.product}`)

    const res = await data.json()
    console.log(res)


  return (
    <div>
      {params.product} snowboard is awesome.
      <Image src={`${res.snowboard_images[0]}`} alt='beaitful board' width={200} height={450}/>
    </div>
  )
}