import Image from "next/image"

export default async function NavBar( { params }:any) {
  console.log(params.navbar)

  try {
    const data = await fetch('http://localhost:8000/collection/snowboards')
    const response = await data.json()

    const filteredResponse = response.filter((snowboard:any) => {
      return snowboard.header_description.includes('MEN') && !snowboard.header_description.includes('WOMEN');
  });

  console.log(filteredResponse)
  } catch(err) {
    console.error('ye error', err)
  }

  return (
    <>
      <div className='border-2 border-white'>NavBar</div>
      <Image width={1024} height={500} src='https://cdn.shopify.com/s/files/1/0231/7366/0752/files/D_hero_YTH05_MICROMINI.jpg?v=1689796595' alt='beautiful' />
      <Image src='http://capitasnowboarding.com/cdn/shop/products/YTH05_MICRO_MINI_90.png?v=1691316310&width=1024' width={1024} height={500} alt='pretty'/>
    </>
  )
}
