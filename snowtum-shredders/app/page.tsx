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
            className='absolute flex font-calibre font-bold tracking-tighter bg-primary self-end bottom-[93px] py-4 hover:underline w-3/12 justify-center rounded-full'
            >
              OPEN YOUR MIND
          </Link>
        </section>


        <section className='flex relative w-full'>
          <div className='flex bg-secondary text-primary py-48'>
            <div className='flex flex-col items-end justify-end rotate-90'>
             <span className='flex text-[18px]'>{snowboard.rider_type}</span>
             <span className='flex font-bold whitespace-nowrap text-[56px] leading-[42px]'>{snowboard.name}</span>
            </div>
          </div>

          <Image
            src='https://capitasnowboarding.com/cdn/shop/files/D_hompage_productbanner_arthurlongo.jpg?v=1696266979'
            alt='Arthur Longo Picture'
            width={500}
            height={500}
            className='w-8/12 flex-grow'
          />

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
            <p className='flex text-[3rem] text-[#fefefe] text-center tracking-tight font-medium font-calibre px-10'>
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
