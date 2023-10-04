
import Image from "next/image";

interface ProductParams {
  params: {
    products: string
  }
}
export default async function Product({ params }: ProductParams ) {

  console.log(params.products[1])


    const data = await fetch(`http://localhost:8000/product/${params.products[1]}`)

    const res = await data.json()
    console.log(res)


  return (
    <div>
      {params.products[1]} snowboard is awesome.
      <Image src={`${res.snowboard_images[0]}`} alt='beaitful board' width={200} height={450}/>
    </div>
  )
}