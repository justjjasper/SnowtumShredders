import Image from 'next/image'
import Link from 'next/link'
import { indoorAPI } from './config'
import { backgroundImage } from './assets/images/Data'

export default async function Home() {
  try{
    const data = await fetch(indoorAPI)
    const snowboard = await data.json()

    return (
      <main className="flex flex-col items-center relative bottom-[100px] z-20">
        <section className="relative flex justify-center w-full"
          >
          <Image
            src='https://res.cloudinary.com/jasjasper/image/upload/v1696808288/snowtum-shredders-banner_xcxkev.png'
            alt='Snowtum Shredder Desktop Banner'
            width={500}
            height={500}
            priority={true}
            className='w-full hidden md:block'
          />

        <div className='mobileImage h-[500px]'>

        <Image
        src='https://res.cloudinary.com/jasjasper/image/upload/v1697557655/MobileBanner_khhebe.png'
        alt='Snowtum Shredder Mobile Banner'
        priority={true}
        className='block md:hidden w-full'
        height={900}
        width={500}
        objectFit='cover'
        />
        </div>

          <Link href='/collections/all-snowboards'
            className='absolute bottom-[10%] w-3/12 flex justify-center self-end py-4 rounded-full font-calibre font-bold tracking-tighter bg-primary hover:underline min-w-[340px]'
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

            <div className="left-banner-card flex flex-col items-center font-calibre rounded-2xl border-[1px] translate-x-[70%] bg-[url('https://capitasnowboarding.com/cdn/shop/files/000_GRID_PAPER_BG_1_77e3e65d-56ba-4a1f-a70b-76408f3b3cbf.png?v=1690637051')]">

              <Link href='products/snowboard/indoor-survival' className='flex flex-col justify-between h-full'>
                <Image
                  src={snowboard.images[0]}
                  alt='Indoor Survival'
                  width={278}
                  height={450}
                  className='flex pt-10 transition-transform ease-in-out duration-300 hover:scale-105'
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
      </main>
    )
  }catch(err) {
    return (
      <div>
        Error Loading Page
      </div>
    )
  }
}
