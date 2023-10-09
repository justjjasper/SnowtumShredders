import Image from 'next/image'
import Link from 'next/link'
import { indoorAPI } from './config'
import { backgroundImage } from './Misc/Data'

export default async function Home() {
  try{
    const data = await fetch(indoorAPI)
    const snowboard = await data.json()
    console.log(snowboard)
    return (
      <div className="flex flex-col items-center">
        <section className='relative flex justify-center'
          style={{width: '100%', height: '100%'}}
          >
          <Image
            src='https://res.cloudinary.com/jasjasper/image/upload/v1696808288/snowtum-shredders-banner_xcxkev.png'
            alt='Snowtum Shredder Banner'
            width={500}
            height={500}
            priority={true}
            className='w-full'
          />
          <Link href='/collections/all-snowboards'
            className='absolute w-3/12  flex justify-center self-end bottom-[93px] py-4 rounded-full font-calibre font-bold tracking-tighter bg-primary hover:underline'
            >
              OPEN YOUR MIND
          </Link>
        </section>

        <section className='relative w-full flex justify-center h-[700px]'>
          <div className='left-banner flex flex-grow bg-secondary py-20 text-primary'>

            <div className='left-banner-text flex flex-col items-end justify-end pl-16 leading-[37px] border-[#ffffff]'>
             <span className='flex text-[18px]'>{snowboard.rider_type}</span>
             <span className='flex font-bold whitespace-nowrap text-[56px]'>{snowboard.name}</span>
            </div>

            <div className="left-banner-card flex flex-col items-center font-calibre rounded-2xl border-2 translate-x-1/2 bg-[url('https://capitasnowboarding.com/cdn/shop/files/000_GRID_PAPER_BG_1_77e3e65d-56ba-4a1f-a70b-76408f3b3cbf.png?v=1690637051')]">

              <Link href='products/snowboard/indoor-survival' className='flex flex-col justify-between h-full'>
                <Image
                  src={snowboard.images[0]}
                  alt='Indoor Survival'
                  width={278}
                  height={477}
                  className='flex pt-10'
                />

                <div className='flex justify-center bg-primary text-secondary py-3 rounded-b-xl'>
                  <span className='flex font-bold tracking-tight'>SHOP NOW</span>
                </div>
              </Link>
            </div>
          </div>

          <div className='right-banner w-[63%] flex flex-grow'>
            <Image
              src='https://capitasnowboarding.com/cdn/shop/files/D_hompage_productbanner_arthurlongo.jpg?v=1696266979'
              alt='Arthur Longo Picture'
              width={690}
              height={960}
              className='flex w-full'
            />

          </div>
        </section>

        <section className='relative flex w-full items-center justify-center align-center'>
          <Image
            src={backgroundImage}
            alt='Background Grid'
            width={500}
            height={100}
            className='w-full'
          />
          <div className='flex flex-col absolute justify-center items-center'>
            <p className='flex text-[3rem] text-[#ffffff] text-center tracking-tight font-medium font-calibre px-10'>
              Snowtum Shredders&apos; Snowboards are handcrafted in San Diego with self-generated clean energy at The MotherShip™.
            </p>
            <Image
              src='https://capitasnowboarding.com/cdn/shop/files/HOMEPAGE.png?v=1686394059'
              alt='Symbols'
              width={200}
              height={200}
              className='flex py-10'
            />
          </div>
        </section>

      </div>
    )
  }catch(err) {
    return (
      <div>
        Error Loading Page
      </div>
    )
  }
}
